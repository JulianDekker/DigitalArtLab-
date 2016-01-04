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

    public function groupUsersByTime($time1,$time2){

        return $this->getEntityManager()
            ->createQuery(
                'SELECT h, SUBSTRING(h.datecreated, 1, 10) as date  FROM DigitalArtLabBundle:User h WHERE h.datecreated BETWEEN :time1 and :time2 ORDER BY date'
            )
            ->setParameters(array(
                'time1' => $time1,
                'time2' => $time2,
            ))
            ->getResult();
    }

}