
from fastapi import FastAPI
from src.routes import auth, posts
from src.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = [
    "https://blog-web-application-tp77.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(posts.router)


@app.get("/")
def root():
    return {
        "message": "API is running"
        }
