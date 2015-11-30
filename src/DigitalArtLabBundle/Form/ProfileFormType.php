<?php
// src/AppBundle/Form/ProfileFormType.php

namespace DigitalArtLabBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormBuilder;
use FOS\UserBundle\Form\Type\ProfileFormType as BaseType;

class ProfileFormType extends AbstractType
{

    public function getName()
    {
        return 'profileform';
    }

    public function getParent()
    {
        return 'fos_user_profile';
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder

            ->add('firstName', null, array('label' => 'Voornaam', 'attr' => array('class'=>'input100'), 'label_attr' => array('class' => 'label100') ))
            ->add('lastName', null, array('label' => 'Achternaam', 'attr' => array('class'=>'input100'), 'label_attr' => array('class' => 'label100') ))
            ->add('email', 'email', array('label' => 'Email', 'attr' => array('class'=>'input100'), 'label_attr' => array('class' => 'label100') ))
            ->add('address', null, array('label' => 'Address', 'attr' => array('class'=>'input100'), 'label_attr' => array('class' => 'label100') ))
            ->add('zipcode', null, array('label' => 'Postcode', 'attr' => array('class'=>'input100'), 'label_attr' => array('class' => 'label100') ))
            ->add('interesses', 'textarea', array('label' => 'Interesses','required' => false, 'empty_data' => false, 'attr' => array('class'=>'input100'), 'label_attr' => array('class' => 'label100') ))
            ->add('Expertises', 'textarea', array('label' => 'Expertises','required' => false, 'empty_data' => false, 'attr' => array('class'=>'input100'), 'label_attr' => array('class' => 'label100') ))
        ;
    }
}