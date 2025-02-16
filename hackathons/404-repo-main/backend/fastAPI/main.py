from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext 
from typing import Annotated, List
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import pandas as pd
import re


products_info=pd.read_csv('data/products_info.csv', sep=";")
products = pd.read_csv('data/Products.csv')
users = pd.read_csv('data/Users.csv')
receipts = pd.read_csv('data/Receipts.csv', quotechar='"')
product_item = pd.read_csv('data/ProductItems.csv')
organisations=pd.read_csv('data/Organizations.csv')


app = FastAPI()



oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


origins = [
  "http://localhost",
  "http://localhost:8080",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://172.24.160.1:5173/"
  "127.0.0.1:58781"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
  )

class Transaction(BaseModel):
  amount: float
  category: str
  description: str
  is_income: bool
  date: str
  
  
    
class UserCreate(BaseModel):
  username: str
  password: str
  
class TokenData(BaseModel):
    username: str
    
class User(BaseModel):
  id: int
  username: str
    
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()
    

    
db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)


#Create User
def get_user_by_username(username: str, db: db_dependency):
  return db.query(models.User).filter(models.User.username == username).first()

def create_user(user: UserCreate, db: db_dependency):
  hashed_password = pwd_context.hash(user.password)
  db_user = models.User(username=user.username, hashed_password=hashed_password)
  db.add(db_user)
  db.commit()
  db.refresh(db_user)
  return db_user

@app.post('/register/')
def register(user: UserCreate, db: Session = Depends(get_db)):
  db_user = get_user_by_username(user.username, db)
  if db_user:
    raise HTTPException(status_code=400, detail="Username already exists")
  return create_user(user, db)

#Login
# pu pu pu
def authenticate_user(username: str, password: str, db: Session):
  user = get_user_by_username(username, db)
  if not user:
    return False
  if not pwd_context.verify(password, user.hashed_password):
    return False
  return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
  to_encode = data.copy()
  if expires_delta:
    expire = datetime.now(timezone.utc) + expires_delta
  else:
    expire = datetime.now(timezone.utc) + timedelta(minutes=15)
  to_encode.update({"exp": expire})
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt

@app.post('/token/')
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
  user = authenticate_user(form_data.username, form_data.password, db)
  if not user:
    raise HTTPException(
      status_code=401,
      detail="Incorrect username or password",
      headers={"WWW-Authenticate": "Bearer"},
    )
  access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  access_token = create_access_token(
    data={"sub": user.username}, expires_delta=access_token_expires
  )
  return {"access_token": access_token, "token_type": "bearer", "username": user.username}

#Verify Token
def verify_token(token: str = Depends(oauth2_scheme)):
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username: str = payload.get("sub")
    if username is None:
      raise HTTPException(status_code=403, detail="Token is invalid or expired")
    return payload
  except JWTError:
    raise HTTPException(status_code=403, detail="Token is invalid or expired")

@app.get('/verify-token/{token}')
async def verify_user_token(token: str):
  verify_token(token)
  return {"message": "Token is valid"}





#Hackathon

# видалення зляв - неактуально
def delete_item_products(products):
    print(products.shape[0])
    products['name'] = products['name'].str.strip()
    products['name'] = products['name'].str.lower()
    products = products[~products['name'].str.contains('zľava|akcia|karta|PET|deposit', case=False, na=False)]
    products = products.dropna()
    print(products.shape[0])


# айді чека і що там
def receipts_item():
    unique_check = product_item['fs_receipt_id'].tolist()
    check_dict = {}
    for check in unique_check:
        products_for_check = product_item[product_item['fs_receipt_id'] == check]['product_id'].tolist()
        check_dict[check] = products_for_check
    return check_dict

#рахування скоре по чеку
def calculate_score_for_receipts(array,dict):
    average=0
    print(array)
    if len(array) != 0:
        for items in array:
            average+=dict[items]
        return round(average/len(array),2)/5
    return 0

@app.get("/get-score")
async def get_score():
    return {"score_receipts": calculate_score_for_receipts(receipts_item()[1],calculate_score())}


#рахування скоре для товару
def calculate_score():
    print(products_info.columns)
    id = pd.to_numeric(products_info['id'], errors='coerce')
    name = products[products['id'] == id]['name'].tolist()
    country = pd.to_numeric(products_info['country'], errors='coerce')

    co2 = products_info['CO2'].str.replace(',', '.')
    co2 = pd.to_numeric(co2, errors='coerce')

    worker = pd.to_numeric(products_info['worker'], errors='coerce')

    water = products_info['water'].str.replace(',', '.')
    water = pd.to_numeric(water, errors='coerce')

    energy = products_info['energy'].str.replace(',', '.')
    energy = pd.to_numeric(energy, errors='coerce')


    co2_score=5-((co2 - 0.5)/(50-0.5))*(5-1)
    water_score=5-((water - 300)/(1500-300))*(5-1)
    energy_score = 5 - ((energy - 0.50) / (70 - 0.50)) * (5 - 1)
    score_dict = {}

    for index, row in products_info.iterrows():
        score = (co2_score[index] * 0.4) + (row['worker'] * 0.2) + (water_score[index] * 0.15) + (
                    energy_score[index] * 0.15) + (row['country'] * 0.1)
        score_dict[row['id']] = round(float(score),2)
    return score_dict


# @app.get("/get-metrics")
# async def get_metrics():
#     metrics = []
#
#     # Проходим по строкам данных продуктов
#     for _, row in products_info.iterrows():
#         # Получаем ID продукта
#         product_id = int(row['id'])  # Преобразуем в стандартный тип Python (int)
#
#         # Получаем название продукта по ID
#         name = products[products['id'] == product_id]['name'].iloc[0]
#
#         # Получаем страну продукта
#         country = row['country']
#
#         # Преобразуем и получаем другие атрибуты
#         co2 = row['CO2']
#         co2 = float(co2.replace(',', '.')) if isinstance(co2, str) else co2
#
#         worker = row['worker']
#         worker = float(worker) if not isinstance(worker, (int, float)) else worker
#
#         water = row['water']
#         water = float(water.replace(',', '.')) if isinstance(water, str) else water
#
#         energy = row['energy']
#         energy = float(energy.replace(',', '.')) if isinstance(energy, str) else energy
#
#         # Создаем словарь для текущего продукта
#         product_metrics = {
#             "id": product_id,
#             "name": name,
#             "country": country,
#             "co2": co2,
#             "worker": worker,
#             "water": water,
#             "energy": energy
#         }
#
#         # Добавляем словарь в список
#         metrics.append(product_metrics)
#
#     # Возвращаем список продуктов
#     return {"metrics_item": metrics}


# def get_metrics_by_receipts_id(receipts_id):
#


# @app.get("/get-metrics-by-id")
def get_metrics_by_id(product_id):
    product_info = products_info[products_info['id'] == product_id]
    name = products[products['id'] == product_id]['name'].iloc[0]
    country = product_info['country'].iloc[0]
    co2 = product_info['CO2'].iloc[0]
    co2 = float(co2.replace(',', '.')) if isinstance(co2, str) else co2

    worker = product_info['worker'].iloc[0]
    worker = float(worker) if not isinstance(worker, (int, float)) else worker

    water = product_info['water'].iloc[0]
    water = float(water.replace(',', '.')) if isinstance(water, str) else water

    energy = product_info['energy'].iloc[0]
    energy = float(energy.replace(',', '.')) if isinstance(energy, str) else energy

    product_metrics = {
        "id": product_id,
        "name": name,
        "country": country,
        "co2": co2,
        "worker": worker,
        "water": water,
        "energy": energy
    }

    return product_metrics

#чек користувача
def customer_receipts():
    unique_users = users['id'].unique()
    user_check_array = []
    for user in unique_users:
        user_checks = receipts[receipts['customer_id'] == user]['id'].tolist()
        user_check_array.append(user_checks)
    return user_check_array

#місто магазину
def get_city_of_purchase(check_id, check_dict):
    return receipts[receipts['id'] == check_id]['org_municipality'][0]

#назва магазину
def get_shop_name(check_id, check_dict):
    return receipts[receipts['id'] == check_id]['org_name'].iloc[0]

#ціна чеку
def get_check_price(check_id, check_dict):
    reslt = 0
    for product in check_dict[check_id]:
        # Fix the condition with proper parentheses around logical operators
        product_check = product_item[
            (product_item['product_id'] == product) & (product_item['fs_receipt_id'] == check_id)
            ]['product_id'].iloc[0]  # Using iloc to get the first value

        # Add the price of the product to res (not overwriting it)
        reslt += products[products['id'] == product_check]['price'].iloc[0]  # Use iloc for getting value
    return reslt

# середнє значення скоре для користувачів
def average_score_for_users():
    dict_customer_receipts = customer_receipts()
    score_dict = calculate_score()
    dict_receipts=receipts_item()
    average_score_user=0
    for id, value in enumerate(dict_customer_receipts, start=1):
        result=0
        for item in value:
            result+=calculate_score_for_receipts(dict_receipts.get(item, []),score_dict)
        average_score_user+=round(result/len(value),2)
    return round(average_score_user/len(dict_customer_receipts),2)




# категорія продукту
def get_prod_category(product_id):
    return products[products['id'] == product_id]['category'].iloc[0]

# рекомендація

def get_prod_array_by_category(product_id, score_dict):
    prod_id_by_category = []
    if score_dict.get(product_id, 0) < 3.5:
        print(score_dict.get(product_id, 0))
        product_category = get_prod_category(product_id)
        prod_id_by_category = products[
            (products['category'] == product_category) &
            (products['id'].isin(score_dict)) &
            (products['id'].apply(lambda x: score_dict.get(x, 0) > 3.5))
            ]['name'].tolist()

    return prod_id_by_category

# відправлення порад
@app.get("/get-average/{id}")
async def get_average(id: int):
    predict=get_prod_array_by_category(id,calculate_score())
    return predict


def get_shop_category(shop_id):
    if isinstance(shop_id, pd.Series):
        shop_id = shop_id.iloc[0]
    category = organisations[organisations['id'] == shop_id]['category']
    if not category.empty  and isinstance(category.iloc[0], str):
        match = re.match(r'^(.*?)(?=/)', category.iloc[0])
        return match.group(1)
    return "Unknown"

#сортування дат по даті
def sort_data_by_date():
    df = pd.DataFrame(receipts)
    df['last_modified_date'] = pd.to_datetime(df['last_modified_date'], format='%m/%d/%Y %H:%M')
    df_sorted = df.sort_values(by='last_modified_date')
    # df_sorted = df.sort_values(by='date', ascending=False)
    print(df_sorted)
    return df_sorted


# дата транзакції
def get_date_of_purchase(check_id):
    filtered_receipt = receipts[receipts['id'] == check_id]
    if not filtered_receipt.empty:
        return filtered_receipt['created_date'].iloc[0]
    else:
        return None

def get_id_shop_by_name(shop_name):
    res =  organisations[organisations['name'] == shop_name]["id"]
    if res.empty:
        return None
    else:
        return res.iloc[0]

# TO-DO

# def month_statistics(user_id, cust_rec, score_dict):
#     user_date = receipts[receipts['id'].isin(cust_rec[user_id])]['created_date']
#     user_date_2024 = receipts[
#         (receipts['id'].isin(cust_rec[user_id])) &
#         (receipts['created_date'].str.contains('/2024'))
#         ]
#     month_av_score = []
#     for rec in user_date_2024['id']:
#         user_id_array = list(cust_rec[user_id])
#         print(rec)
#         # sc_rec = calculate_score_for_receipts(user_id_array, score_dict)
#         date_string = user_date_2024[user_date_2024['id'] == rec]['created_date'][0]
#         # month = int(user_date_2024['created_date'].str.split('/')[0])
#         # month_av_score.append(sc_rec)
#         pass


# @app.get("/transaction")
# async def get_transaction():

def check(receipts_id):
    print(receipts_item()[receipts_id])


@app.get("/get-metrics")
async def get_metrics():
    metrics = []

    for _, row in products_info.iterrows():

        product_id = int(row['id'])


        name = products[products['id'] == product_id]['name'].iloc[0]


        country = row['country']

        co2 = row['CO2']
        co2 = float(co2.replace(',', '.')) if isinstance(co2, str) else co2

        worker = row['worker']
        worker = float(worker) if not isinstance(worker, (int, float)) else worker

        water = row['water']
        water = float(water.replace(',', '.')) if isinstance(water, str) else water

        energy = row['energy']
        energy = float(energy.replace(',', '.')) if isinstance(energy, str) else energy

        product_metrics = {
            "id": product_id,
            "name": name,
            "country": country,
            "co2": co2,
            "worker": worker,
            "water": water,
            "energy": energy
        }

        metrics.append(product_metrics)

    return {"metrics_item": metrics}

@app.get("/get-info-receipts/{id}")
def info_about_receipts(id: int):
    score_dict = calculate_score()
    sort_data_by_date()
    check_dict = receipts_item()

    user_receipts = customer_receipts()[id]

    receipt_details = {}

    for receipt in user_receipts:
        shop_name = get_shop_name(receipt, check_dict)
        shop_id = get_id_shop_by_name(shop_name)
        shop_id = int(shop_id) if shop_id is not None else -1
        receipt_details[receipt] = {
            "date_of_purchase": get_date_of_purchase(receipt),
            "shop_name": shop_name,
            "shop_id": shop_id,
            "shop_category": get_shop_category(shop_id) if shop_id != -1 else "Unknown"
        }
    return receipt_details

if __name__ == '__main__':
    print("Hello world!!!!")
    get_shop_category(3)
    
    
