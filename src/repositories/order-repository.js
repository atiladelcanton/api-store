'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async () => {
    const res = await Order.find({}, 'order_number status customer items')
        .populate('customer', 'name')
        .populate('items.product', 'title price');
    return res;
}

exports.create = async (data) => {
    let order = new Order(data);
    await order.save();
}

exports.destroy = async (id) => {
    await Order.findOneAndDelete(id);
}