<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Country;

class SidebarContent extends Component
{
    public $recordId;
    public $record;

    // Add event listener for the loadModel event
    protected $listeners = ['loadModel'];

    // This method will load the record based on the clicked button
    public function loadModel($id)
    {
        $this->recordId = $id;
        $this->record = Record::find($this->recordId);
    }

    public function render()
    {
        return view('livewire.sidebar-content');
    }
}
