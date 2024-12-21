from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from routers.game_router import router as game_router

app = FastAPI(
    title="Steam Games API",
    description="API to get game details from the Steam Store.",
    version="0.1",
    openapi_tags=[{
        "name": "Game",
        "description": "Operations related to games."
    }]
)

app.include_router(game_router, tags=["Game"], prefix="/games")

@app.get("/", include_in_schema=False)
async def redirect_to_docs():
    return RedirectResponse(url="/docs")
