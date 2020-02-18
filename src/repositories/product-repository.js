'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
    const res = await Product.find({ active: true }, 'title price slug');
    return res;
}

exports.getBySlug = async (slug) => {
    const res = await Product.findOne({
        slug: slug,
        active: true
    }, 'title  subscription price slug tags');

    return res;
}

exports.getByTag = async (tag) => {
    const res = await Product.find({
        tags: tag,
        active: true
    }, 'title  subscription price slug tags');
    return res;
}

exports.getById = async (id) => {
    const res = await Product.findById(id);
    return res;
}

exports.create = async (body) => {
    let product = new Product(body);
    await product.save();
}

exports.update = async (id, body) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: body.title,
            subscription: body.subscription,
            price: body.price,
            slug: body.slug
        }
    });
}

exports.destroy = async (id) => {
    await Product.findOneAndDelete(id);
}