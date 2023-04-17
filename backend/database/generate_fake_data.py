import sys
sys.path.append('..')  # Add the parent directory to the Python path
from faker import Faker
from database_init import db, connection_string
from database_models import Customer, Product, Order, OrderItem
from flask import Flask
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = connection_string
db.init_app(app)

fake = Faker()

def create_customers(num_customers=600):
    for _ in range(num_customers):
        first_name = fake.first_name()
        last_name = fake.last_name()
        email = f"{first_name}_{last_name}@{random.choice(['gmail', 'hotmail', 'yahoo', 'live'])}.com"
        customer = Customer(name=f"{first_name} {last_name}", email=email)
        db.session.add(customer)

def create_products(num_products=20):
    products = ['Wireless headphones','Running shoes','Smart watch','Portable charger','Yoga mat','Water bottle','Backpack','Dumbbell set','Bluetooth speaker',' Fitness Tracker','Resistance bands','Travel pillow','Bike lock','Digital scale','Meal prep container','Treadmill','Toothbrush','Standing desk converter','Adjustable dumbbells']
    for item in products:
        product = Product(
            name=item,
            price=random.randint(50, 200)
        )
        db.session.add(product)

def create_orders_and_order_items(num_orders=1200):
    customers = Customer.query.all()
    products = Product.query.all()

    for _ in range(num_orders):
        customer = random.choice(customers)
        num_items = random.randint(1, 3)
        order_items = [OrderItem(product=random.choice(products), quantity=random.randint(1, 10)) for _ in range(num_items)]
        amount = sum(item.product.price * item.quantity for item in order_items)
        status = random.choices(['succeeded', 'pending', 'returned'], weights=[90, 8, 2], k=1)[0]
        order = Order(customer=customer, amount=amount, items=order_items, status=status)
        db.session.add(order)

        # Add order_items to the session
        for order_item in order_items:
            db.session.add(order_item)

if __name__ == '__main__':
    with app.app_context():
        db.reflect()
        db.drop_all()
        db.create_all()

        create_customers()
        create_products()
        create_orders_and_order_items()

        db.session.commit()