<?php

namespace DigitalArtLabBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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
    public function adminUsermanagerAction(Request $request)
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

    /**
     * @param Request $request
     * @return Response
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function createTransactionAction(request $request){
        $em = $this->getDoctrine()->getManager();

        $amountdata = $request->request->get('amountdata');
        $userdata = $request->request->get('userdata');
        $reasondata = $request->request->get('reasondata');
        $user = $em->getRepository('DigitalArtLabBundle:User')->findOneByUsername($userdata);

        $transaction = new transaction();

        $transaction->setAdminName($this->container->get('security.context')->getToken()->getUser());
        $transaction->setTime(new \DateTime());
        $transaction->setamount($amountdata);
        $transaction->setUser($user);
        $transaction->setMessage($reasondata);

        $oldbalance = $user->getSaldo();
        $newbalance = $oldbalance + $amountdata;

        if ($newbalance >= 0){
            $user->setSaldo($newbalance);
            $transaction->setOldbalance($oldbalance);
            $transaction->setNewbalance($newbalance);

            $em->persist($transaction);
            $em->flush();

            $response = array("code" => 100, "success" => true, "newsaldo" => $newbalance, "reasondata" => $reasondata);
        }
        else{
            $response = array("code" => 200, "success" => false,);
        }

        //you can return result as JSON
        return new Response(json_encode($response));
    }

}