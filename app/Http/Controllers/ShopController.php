<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\Shop\ProductIndexRequest;
use App\Services\ShopService;

class ShopController extends Controller
{
    public function __construct(
        private ShopService $shopService
    ) {}

    public function index(ProductIndexRequest $request)
    {
        $data = $this->shopService->getShopPageData($request);

        return Inertia::render('shop', $data);
    }
}
