
from sqlalchemy.orm import Session
from src.models.post import Post
from src.schemas.post import PostCreate

def create_post(db: Session, post: PostCreate, user_id: int):
    new_post = Post(
        title=post.title,
        content=post.content,
        user_id=user_id
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post


def get_all_posts(db: Session):
    return db.query(Post).all()


def get_post(db: Session, post_id: int):
    return db.query(Post).filter(Post.id == post_id).first()


def update_post(db: Session, post, updated_post: PostCreate):
    post.title = updated_post.title
    post.content = updated_post.content

    db.commit()
    db.refresh(post)

    return post


def delete_post(db: Session, post):
    db.delete(post)
    db.commit()
    