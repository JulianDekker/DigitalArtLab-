<?php

namespace DigitalArtLabBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use DigitalArtLabBundle\Entity\transaction;
use DigitalArtLabBundle\Form\transactionType;

/**
 * transaction controller.
 *
 * @Route("/admin/transaction")
 */
class transactionController extends Controller
{

    /**
     * Lists all transaction entities.
     *
     * @Route("/", name="admin_transaction")
     * @Method("GET")
     * @Template()
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('DigitalArtLabBundle:transaction')->findBy([], ['time' => 'DESC']);


        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new transaction entity.
     *
     * @Route("/", name="admin_transaction_create")
     * @Method("POST")
     * @Template("DigitalArtLabBundle:transaction:new.html.twig")
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function createAction(Request $request)
    {
        $entity = new transaction();
        $form = $this->createCreateForm($entity);
        $entity->setAdminName($this->container->get('security.context')->getToken()->getUser());
        $entity->setTime(new \DateTime());

        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();

            $user = $em->getRepository('DigitalArtLabBundle:User')->find($entity->getUser());
            $oldbalance = $user->getSaldo();
            $newbalance = $oldbalance + $form->get('amount')->getData();

            if ($newbalance > 0){
                $user->setSaldo($newbalance);
                $entity->setOldbalance($oldbalance);
                $entity->setNewbalance($newbalance);

                $em->persist($entity);
                $em->flush();

                $status = 'Succes';
            }
            else{
                $status = 'Fail';
            }

            /*return $this->render('DigitalArtLabBundle:transaction:index.html.twig', array(
                'id' => $entity->getId(),
                'username' => $entity->getUser(),
                'status' => $status,
                'entities' => $em->getRepository('DigitalArtLabBundle:transaction')->findAll()
            ));*/


            return $this->redirect($this->generateUrl('admin_transaction', array(
                'id' => $entity->getId(),
                'status' => $status,
                'entities' => $em->getRepository('DigitalArtLabBundle:transaction')->findAll()
            )));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a transaction entity.
     *
     * @param transaction $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     * @Security("has_role('ROLE_ADMIN')")
     */
    private function createCreateForm(transaction $entity)
    {
        $form = $this->createForm(new transactionType(), $entity, array(
            'action' => $this->generateUrl('admin_transaction_create'),
            'method' => 'POST',
        ));
        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new transaction entity.
     *
     * @Route("/new", name="admin_transaction_new")
     * @Method("GET")
     * @Template()
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function newAction()
    {
        $entity = new transaction();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }


}
