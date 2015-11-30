<?php
// src/AppBundle/Form/RegistrationType.php

namespace DigitalArtLabBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class RegistrationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('firstname', null, array('label' => 'Voornaam', 'attr' => array('class'=>'input100'), 'label_attr' => array('class' => 'label100') ));
        $builder->add('lastname', null, array('label' => 'Achternaam', 'attr' => array('class'=>'input100'), 'label_attr' => array('class' => 'label100') ));
        /*$builder->add('address', null, array('label' => 'Address', 'attr' => array('class'=>'input100'), 'label_attr' => array('class' => 'label100') ));
        $builder->add('zipcode', null, array('label' => 'Postcode', 'attr' => array('class'=>'input100'), 'label_attr' => array('class' => 'label100') ));
        $builder->add('Expertises', 'textarea', array('label' => 'Expertises','required' => false, 'empty_data' => false, 'attr' => array('class'=>'input100'), 'label_attr' => array('class' => 'label100') ));
        $builder->add('Interesses', 'textarea', array('label' => 'Interesses','required' => false, 'empty_data' => false, 'attr' => array('class'=>'input100'), 'label_attr' => array('class' => 'label100') ));
        /*$builder->add('saldo', 'integer', array(
            'label' => 'Saldo',
            'data' => '0',
            'attr' => array('class'=>'input100'),
            'label_attr' => array('class' => 'label100')
        ));*/
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