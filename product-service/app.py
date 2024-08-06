from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@db/products_db'
db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float, nullable=False)

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.get_json()
    new_product = Product(name=data['name'], price=data['price'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.id), 201

@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{'id': product.id, 'name': product.name, 'price': product.price} for product in products]), 200

@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()
    product = Product.query.get(id)
    if product is None:
        return jsonify({'message': 'Product not found'}), 404
    product.name = data['name']
    product.price = data['price']
    db.session.commit()
    return jsonify({'message': 'Product updated'}), 200

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    if product is None:
        return jsonify({'message': 'Product not found'}), 404
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'}), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
