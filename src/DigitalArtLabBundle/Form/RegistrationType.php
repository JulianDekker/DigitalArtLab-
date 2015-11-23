<?php
// src/AppBundle/Form/RegistrationType.php

namespace DigitalArtLabBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class RegistrationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('firstname');
        $builder->add('lastname');
        $builder->add('address');
        $builder->add('zipcode');
        $builder->add('Expertises');
        $builder->add('Interesses');
        $builder->add('saldo', 'integer', array(
            'label' => 'Saldo',
            'data' => '0'
        ));
    }

    public function getParent()
    {
        return 'fos_user_registration';
    }

    public function getName()
    {
        return 'app_user_registration';
    }
}