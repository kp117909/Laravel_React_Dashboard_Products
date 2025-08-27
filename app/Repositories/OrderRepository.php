<?php

namespace App\Repositories;

use App\Models\Order;
use Illuminate\Pagination\LengthAwarePaginator;


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

    public function findByUserId(int $userId, int $perPage = 10, ?string $search = null, array $options = []): LengthAwarePaginator
    {
        $query = $this->model
            ->where('user_id', $userId)
            ->with(['items.product', 'cart']);

        if ($search) {
            $query->whereHas('items.product', function ($productQuery) use ($search) {
                $productQuery->where('name', 'like', "%{$search}%");
            });
        }

        if (!empty($options['sort'])) {
            $direction = $options['direction'] ?? 'desc';
            $query->orderBy($options['sort'], $direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return $query->paginate($perPage)->withQueryString();
    }

    public function findByIdAndUserId(int $orderId, int $userId): ?Order
    {
        return $this->model
            ->where('id', $orderId)
            ->where('user_id', $userId)
            ->with(['items.product', 'cart'])
            ->first();
    }
}
