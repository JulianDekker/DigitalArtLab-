<?php

namespace DigitalArtLabBundle\Entity;

use Doctrine\ORM\EntityRepository;

class UserRepository extends EntityRepository
{
    public function findAllOrderedByAanwezig()
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT u FROM DigitalArtLabBundle:User u ORDER BY u.aanwezig DESC, u.username ASC'
            )
            ->getResult();
    }

    public function groupUsers()
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT b, SUBSTRING(b.datecreated, 1, 10) as date FROM DigitalArtLabBundle:User b ORDER BY date'
            )
            ->getResult();
    }

}