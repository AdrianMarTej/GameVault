import requests
from models.game import Game
from config.config import Config

config = Config()

class SteamGameService:
    def __init__(self):
        self.base_url = "https://store.steampowered.com/api/appdetails"
        self.language = "english"
        self.app_list_url = "https://api.steampowered.com/ISteamApps/GetAppList/v2/"

    def get_game_details_by_appid(self, appid :int) -> Game | None:
        """
        Gets the game details from the Steam API by game ID.

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
                return Game.from_dict(game_data)
            else:
                config.logger.info(f"No data found for appid: {appid}.")
                return None
        except requests.RequestException as e:
            config.logger.error(f"Error making request: {e}")
            return None

    def get_game_details_by_name(self, game_name: str) -> Game | None:
        """
        Gets game details from the Steam API by game name.

        param game_name: Name of the game to search for.
        return: Game instance with specific game details or None if no game is found.
        """
        
        config.logger.debug(f"Fetching game details for game: {game_name}")
        
        try:
            # Step 1: Fetch the list of all apps
            response = requests.get(self.app_list_url)
            response.raise_for_status()
            app_list_data = response.json()

            # Step 2: Search for the game by name
            for app in app_list_data["applist"]["apps"]:
                if app["name"].lower() == game_name.lower():
                    appid = app["appid"]
                    return self.get_game_details_by_appid(appid)

            config.logger.info(f"No game found with name '{game_name}'.")
            return None
        except requests.RequestException as e:
            config.logger.error(f"Error fetching app list: {e}")
            return None

