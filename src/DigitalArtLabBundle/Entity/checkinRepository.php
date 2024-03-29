<?php

namespace DigitalArtLabBundle\Entity;

use Doctrine\ORM\EntityRepository;
use DoctrineExtensions\Query\Mysql;

/**
 * checkinRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class checkinRepository extends EntityRepository
{
    public function findLastSessions($username)
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT c FROM DigitalArtLabBundle:checkin c WHERE c.username = :username ORDER BY c.timein DESC'
            )
            ->setParameters(array(
                'username' => $username,
            ))
            ->setMaxResults(7)
            ->getResult();
    }

    public function groupSessions()
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT p, SUBSTRING(p.timein, 1, 10) as date FROM DigitalArtLabBundle:checkin p ORDER BY date'
            )
            ->getResult();
    }

    public function groupSessionsByTime($time1,$time2){

        return $this->getEntityManager()
            ->createQuery(
                'SELECT b, SUBSTRING(b.timein, 1, 10) as date  FROM DigitalArtLabBundle:checkin b WHERE b.timein >= :time1 and b.timein <= :time2 ORDER BY date'
            )
            ->setParameters(array(
                'time1' => $time1,
                'time2' => $time2,
            ))
            ->getResult();
    }

    public function getSessionsByTime($time1,$time2){

        return $this->getEntityManager()
            ->createQuery(
                'SELECT r FROM DigitalArtLabBundle:checkin r WHERE r.timein >= :time1 and r.timein <= :time2 ORDER BY r.timein ASC'
            )
            ->setParameters(array(
                'time1' => $time1,
                'time2' => $time2,
            ))
            ->getResult();
    }
}
