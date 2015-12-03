<?php

namespace DigitalArtLabBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use DigitalartlabBundle\Entity\transaction;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Validator\Constraints\DateTime;

/**
 * admin controller.
 */
class AdminController extends Controller
{

    /**
     * @Route("/admin", name="admin")
     * @Template()
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function adminIndexAction()
    {
        $em = $this->get('doctrine')->getManager();
        $aanwezig = $em->getRepository('DigitalArtLabBundle:User')->findByAanwezig(1);


        return $this->render('DigitalArtLabBundle:Admin:index.html.twig', array(
            'aanwezig' => $aanwezig
        ));
    }

    /**
     * @Route("/admin/gebruikersbeheer", name="admin_usermanager")
     * @Template()
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function adminUsermanagerAction()
    {
        $em = $this->get('doctrine')->getManager();
        $users = $em->getRepository('DigitalArtLabBundle:User')->findAllOrderedByAanwezig();


        return $this->render('DigitalArtLabBundle:Admin:usermanager.html.twig', array(
            'users' => $users,
        ));
    }

    public function generateFormsAction($username){
        $adminname = $this->container->get('security.context')->getToken()->getUser();

        $transaction = new transaction();
        $transaction->setAdminName($adminname);

        $form = $this->createFormBuilder($transaction)
            ->add('username', null)
            ->add('amount', null)
            ->add('submit', 'submit')
            ->getForm();

        return $this->render('admin/transaction.html.twig', array(
            'form' => $form->createView(),
        ));

    }


}