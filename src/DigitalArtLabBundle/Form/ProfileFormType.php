<?php
// src/AppBundle/Form/ProfileFormType.php

namespace DigitalArtLabBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormBuilder;
use FOS\UserBundle\Form\Type\ProfileFormType as BaseType;

class ProfileFormType extends BaseType
{

    public function getName()
    {
        return 'profileform';
    }

    protected function buildUserForm(FormBuilder $builder, array $options)
    {
        $builder
            ->add('email', 'email')
            ->add('firstName')
            ->add('lastName')
        ;
    }
}