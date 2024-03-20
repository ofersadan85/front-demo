from dataclasses import dataclass

@dataclass
class User:
    id: int
    username: str
    password: str
    email: str | None = None
    age: int | None = None


@dataclass
class PublicUser:
    id: int
    username: str
    email: str | None = None
    age: int | None = None


@dataclass
class NewUser:
    username: str
    password: str
    email: str | None = None
    age: int | None = None


# @dataclass
# class BaseUser:
#     username: str
#     email: str | None
#     age: int | None


# @dataclass
# class NewUser(BaseUser):
#     password: str
#     email = None
#     age =


# @dataclass
# class PublicUser(BaseUser):
#     id: int

# @dataclass
# class User(BaseUser):
#     id: int
#     password: str
