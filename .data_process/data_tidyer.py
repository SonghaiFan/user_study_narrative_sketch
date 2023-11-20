import pandas as pd
import json

def load_and_prepare_data(csv_file_path, json_file_path):
    """
    Load CSV and JSON data files and prepare them for merging.
    """
    # Load CSV data
    csv_data = pd.read_csv(csv_file_path)

    # Load and normalize JSON data
    with open(json_file_path, 'r') as file:
        json_data = json.load(file)
    json_df = pd.json_normalize(json_data, 'userSelections', ['userId'], errors='ignore')
    json_df.rename(columns={'userId': 'Participant ID'}, inplace=True)

    return csv_data, json_df

def merge_and_organize_data(csv_data, json_data):
    """
    Merge and organize the data into a tidy format.
    """
    # Merge datasets
    merged_data = pd.merge(csv_data, json_data, on='Participant ID', how='inner')

    # Update columns
    merged_data['Route Path'] = merged_data.apply(lambda x: f"/{x['mode']}/{x['currentIndex']}" if x['mode'] in ['training', 'task'] else x['routePath'], axis=1)
    merged_data['Timestamp'] = merged_data['timestamp'].combine_first(merged_data['Timestamp (Route Path)'])

    # Drop unnecessary columns
    merged_data.drop(columns=['timestamp', 'routePath', 'currentIndex', 'mode', 'Timestamp (Route Path)'], inplace=True)

    return merged_data

def save_data(data, file_path):
    """
    Save the processed data to a CSV file.
    """
    data.to_csv(file_path, index=False)
    print(f"Data saved to {file_path}")

# Example usage
if __name__ == "__main__":
    csv_file_path = '.data_process/data/prolific_export_65566952c6b6b608da9084b0.csv'
    json_file_path = '.data_process/data/prolific_export_65566952c6b6b608da9084b0.csv'
    output_file_path = 'output_file.csv'

    csv_data, json_data = load_and_prepare_data(csv_file_path, json_file_path)
    tidy_data = merge_and_organize_data(csv_data, json_data)
    save_data(tidy_data, output_file_path)
