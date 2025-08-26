<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository
{
    protected Order $model;

    public function __construct(Order $order)
    {
        $this->model = $order;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function find(int $id): ?Order
    {
        return $this->model->find($id);
    }

    public function create(array $data): Order
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): Order
    {
        return $this->model->find($id)->update($data);
    }

    public function findByUserId(int $userId): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model
            ->where('user_id', $userId)
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function findByIdAndUserId(int $orderId, int $userId): ?Order
    {
        return $this->model
            ->where('id', $orderId)
            ->where('user_id', $userId)
            ->with('items.product')
            ->first();
    }
}
