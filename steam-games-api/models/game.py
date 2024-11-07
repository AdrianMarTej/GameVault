from pydantic import BaseModel

class Game(BaseModel):
    id: int # Game identifier
    name: str # Game name
    description: str # Game description
    genre: str # Game genre
    age_rating: int # Game age rating
    developer: str # Game developer

    @classmethod
    def from_dict(cls, data: dict):
        return cls(
            id=data["steam_appid"],
            name=data["name"],
            description=data["short_description"],
            genre=data["genres"][0]["description"],
            age_rating=data["required_age"],
            developer=data["developers"][0]            
        )