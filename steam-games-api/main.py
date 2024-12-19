from services.steam_game_service import SteamGameService

# Example usage
if __name__ == "__main__":
    steam_service = SteamGameService()
    appid = 1245620
    game = steam_service.get_game_details_by_appid(appid)
    if game:
        print(game)
    
    steam_service = SteamGameService()
    game_name = "Elden Ring"
    game = steam_service.get_game_details_by_name(game_name)
    
    # Display game details if found
    if game:
        print(game.json())