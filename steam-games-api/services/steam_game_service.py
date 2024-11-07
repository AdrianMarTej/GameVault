import requests
from typing import Optional, Dict, Any

class SteamGameService:
    def __init__(self):
        self.base_url = "https://store.steampowered.com/api/appdetails"
        self.language = "english"

    def get_game_details_by_appid(self, appid :int) -> Optional[Dict[str, Any]]:
        """
        Gets the game details from the Steam API.

        param appid: ID of the game to get the details from.
        return: Dictionary with the game details or None if an error is thrown.
        """
        params = {
            "appids": appid,
            "l": self.language
        }
        try:
            response = requests.get(self.base_url, params=params)
            response.raise_for_status()  # Lanza una excepción para códigos de error HTTP
            data = response.json()

            if data and str(appid) in data and data[str(appid)]["success"]:
                
                game_data = data[str(appid)]["data"]
                game_details = {
                    "game_name": game_data.get("name"),
                    "game_description": game_data.get("short_description"),
                    "game_genre": game_data.get("genres")[0].get("description") if game_data.get("genres") else None,
                    "game_age_rating": game_data.get("required_age"),
                    "game_developer": game_data.get("developers")[0] if game_data.get("developers") else None,
                }

                return game_details
            else:
                print(f"No data found for appid: {appid}.")
                return None
        except requests.RequestException as e:
            print(f"Error making request: {e}")
            return None

# Ejemplo de uso
if __name__ == "__main__":
    steam_service = SteamGameService()
    appid = 1245620
    game_details = steam_service.get_game_details_by_appid(appid)
    if game_details:
        # print(game_details)
        print(game_details)
