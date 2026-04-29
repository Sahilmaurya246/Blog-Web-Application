
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database import SessionLocal
from src.models.post import Post
from src.schemas.post import PostCreate, PostResponse
from src.dependencies.auth import get_current_user
from src.models.user import User

router = APIRouter(prefix="/posts", tags=["Posts"])
def get_db():
    db=SessionLocal()

    try:
        yield db
    finally:
        db.close()



@router.post("/")
def create_post(post:PostCreate, db:Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_post = Post(title = post.title, content = post.content, user_id = current_user.id)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return {
        "message": "Post created successfully"
        }



@router.get("/",response_model=list[PostResponse])
def get_posts(db:Session=Depends(get_db)):
    posts = db.query(Post).all()
    result = []
    for post in posts:
        result.append({
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "created_at": post.created_at,
            "username": post.user.username   # 🔥 MAIN LINE
        })

    return result



@router.put("/{post_id}")
def update_post(
    post_id:int,
    updated_post: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)

    ):

    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed another access posts")

    post.title = updated_post.title
    post.content = updated_post.content
    db.commit()
    db.refresh(post)

    return {"message": "Post updated successfully"}


@router.delete("/{post_id}")
def delete_post(
    post_id:int,
    db:Session=Depends(get_db),
    current_user: User = Depends(get_current_user)
    ):
    
    post = db.query(Post).filter(Post.id == post_id).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed another access post")

    db.delete(post)
    db.commit()

    return {
        "message": "Post deleted successfully"
        }


@router.get("/my-posts")
def get_my_posts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
    ):
    
    posts = db.query(Post).filter(Post.user_id == current_user.id).all()
    posts = db.query(Post).filter(Post.user_id == current_user.id).all()

    result = []
    for post in posts:
        result.append({
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "created_at": post.created_at,
            "username": post.user.username
        })

    return result
