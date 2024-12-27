import requests

class SteamService:
    def __init__(self, api_key):
        self.api_key = "B7360F0E8FFA22C5AFF1B1B8BDD72FF2"
        self.base_url = "http://api.steampowered.com"

    def get_owned_games(self, steam_id):
        url = f"{self.base_url}/IPlayerService/GetOwnedGames/v0001/"
        params = {
            'key': self.api_key,
            'steamid': steam_id,
            'format': 'json'
        }
        response = requests.get(url, params=params)
        return response.json()

    def get_player_summaries(self, steam_ids):
        url = f"{self.base_url}/ISteamUser/GetPlayerSummaries/v0002/"
        params = {
            'key': self.api_key,
            'steamids': ','.join(steam_ids),
            'format': 'json'
        }
        response = requests.get(url, params=params)
        return response.json()

    def get_friend_list(self, steam_id):
        url = f"{self.base_url}/ISteamUser/GetFriendList/v0001/"
        params = {
            'key': self.api_key,
            'steamid': steam_id,
            'relationship': 'friend',
            'format': 'json'
        }
        response = requests.get(url, params=params)
        return response.json()
    
    def get_game_details(self, app_id: str):
        # Perform the GET request
        response = requests.get(f"https://store.steampowered.com/api/appdetails?appids={app_id}&l=English")

        # Convert the response to JSON
        data = response.json()

        # Extract the game data
        

        return 
