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

}