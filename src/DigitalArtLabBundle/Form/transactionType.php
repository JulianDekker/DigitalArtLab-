<?php

namespace DigitalArtLabBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class transactionType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('user', null, array('label' => 'Kies een gebruiker', 'attr' => array('class'=>'input50'), 'label_attr' => array('class' => 'label100')))
            ->add('amount', null, array('label' => 'Kies een hoeveelheid', 'attr' => array('class'=>'input50'), 'label_attr' => array('class' => 'label100')))
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'DigitalArtLabBundle\Entity\transaction'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'digitalartlabbundle_transaction';
    }
}
