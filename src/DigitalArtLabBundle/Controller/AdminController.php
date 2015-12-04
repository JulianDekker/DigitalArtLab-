<?php

namespace DigitalArtLabBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
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

        /*foreach ($users as $user)
        {
            $show = $this->formShow()->createView();
            $arrayForms[] = $show;
        }*/

        /*var_dump($users);*/
        return $this->render('DigitalArtLabBundle:Admin:usermanager.html.twig', array(
            'users' => $users,
            /*'arrayForms' => $arrayForms*/
        ));
    }

    /*public function saveAction(Request $request)
    {
        if ($request->isXMLHttpRequest()) {
            $data = $request->request->get('request');
            $itemName = // Extract it from $data variable
            $adminname = $this->container->get('security.context')->getToken()->getUser();

            $transaction = new transaction();
            $transaction->setAdminName($adminname);

            $em = $this->getDoctrine()->getManager();
            $em->persist($transaction);
            $em->flush();
        } else {
            // Do something else
        }
    }

    private function formShow()
    {
        $adminname = $this->container->get('security.context')->getToken()->getUser();

        $transaction = new transaction();
        $transaction->setAdminName($adminname);

        $show = $this->createFormBuilder($transaction)
            ->setMethod('POST')
            ->add('username', null, array('label' => 'Gebruikersnaam', 'attr' => array('disabled' => 'disabled') ))
            ->add('user', null, array('label' => 'Gebruikersnaam') )
            ->add('amount', null)
            ->add('submit', 'submit')
            ->getForm();

        return $show;
    }*/
}