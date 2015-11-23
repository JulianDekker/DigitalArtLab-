<?php

namespace DigitalArtLabBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class DigitalArtLabBundle extends Bundle
{
    public function getParent(){
        return 'FOSUserBundle';
    }
}
