<?php

namespace App\Livewire;

use Livewire\Component;

class ToggleStatus extends Component
{
    public $model;
    public $modelId;
    public $status;

    public function mount($model, $modelId)
    {
        $modelClass = "\\App\\Models\\$this->model";
        $data = $modelClass::find($this->modelId);
        $this->status = $data ? $data->status : 0;
    }

    public function toggle()
    {
        $modelClass = "\\App\\Models\\$this->model";
        $data = $modelClass::find($this->modelId);

        if(!empty($data)) {
            // $this->status == 0 ? $status = 1 : $status = 0;
            $data->status = ($data->status == 0) ? 1 : 0;
            $data->save();

            $this->dispatch('quickNotification', [
                'heading' => 'Status updated',
                'desc' => $data->name.' is '.(($data->status == 0) ? 'disabled' : 'active')
            ]);
        }
    }

    public function render()
    {
        return view('livewire.toggle-status');
    }
}
