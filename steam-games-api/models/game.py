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
            id=data.get("id"),
            name=data.get("name"),
            description=data.get("description"),
            genre=data.get("genre"),
            age_rating=data.get("age_rating"),
            developer=data.get("developer")
        )