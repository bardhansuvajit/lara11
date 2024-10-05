<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Country;

class SidebarContent extends Component
{
    public $model;
    // protected $listeners = ['loadModel'];

    public function loadModel($modelId)
    {
        $this->model = Country::find(1);
    }

    public function render()
    {
        if (!$this->model) {
            \Log::error('No Country found with id 1');
        }

        return view('livewire.sidebar-content', [
            'model' => $this->model,
            'otherData' => 12345,
        ]);
    }
}
