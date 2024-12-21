from fastapi import apirouter, HTTPException
from requests import HTTPError
from models.game import Game
from services.steam_game_service import get_game_details_by_appid, get_game_details_by_name

router = APIRouter()

@router.get("/game/{appid}", summary="Get game details by appid.")
async def get_game_by_appid(appid: str) -> Game:
    game = None

    try:
        game = get_game_details_by_appid(appid)
    except HTTPError as e:
        raise HTTPException(status_code=404, detail="Game with id {appid} was not found.")
    
    return game

@router.get("/game", summary="Get game details by name.")
async def get_game_by_name(appname: str) -> Game:
    game = None

    try:
        game = get_game_details_by_name(appname)
    except HTTPError as e:
        raise HTTPException(status_code=404, detail="Game with name {appname} was not found.")
    
    return game