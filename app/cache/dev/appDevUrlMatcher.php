<?php

use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\RequestContext;

/**
 * appDevUrlMatcher.
 *
 * This class has been auto-generated
 * by the Symfony Routing Component.
 */
class appDevUrlMatcher extends Symfony\Bundle\FrameworkBundle\Routing\RedirectableUrlMatcher
{
    /**
     * Constructor.
     */
    public function __construct(RequestContext $context)
    {
        $this->context = $context;
    }

    public function match($pathinfo)
    {
        $allow = array();
        $pathinfo = rawurldecode($pathinfo);
        $context = $this->context;
        $request = $this->request;

        if (0 === strpos($pathinfo, '/css/30ba270')) {
            // _assetic_30ba270
            if ($pathinfo === '/css/30ba270.css') {
                return array (  '_controller' => 'assetic.controller:render',  'name' => '30ba270',  'pos' => NULL,  '_format' => 'css',  '_route' => '_assetic_30ba270',);
            }

            // _assetic_30ba270_0
            if ($pathinfo === '/css/30ba270_print_1.css') {
                return array (  '_controller' => 'assetic.controller:render',  'name' => '30ba270',  'pos' => 0,  '_format' => 'css',  '_route' => '_assetic_30ba270_0',);
            }

        }

        if (0 === strpos($pathinfo, '/js/44a923e')) {
            // _assetic_44a923e
            if ($pathinfo === '/js/44a923e.js') {
                return array (  '_controller' => 'assetic.controller:render',  'name' => '44a923e',  'pos' => NULL,  '_format' => 'js',  '_route' => '_assetic_44a923e',);
            }

            if (0 === strpos($pathinfo, '/js/44a923e_')) {
                if (0 === strpos($pathinfo, '/js/44a923e_jquery')) {
                    // _assetic_44a923e_0
                    if ($pathinfo === '/js/44a923e_jquery_1.js') {
                        return array (  '_controller' => 'assetic.controller:render',  'name' => '44a923e',  'pos' => 0,  '_format' => 'js',  '_route' => '_assetic_44a923e_0',);
                    }

                    // _assetic_44a923e_1
                    if ($pathinfo === '/js/44a923e_jquery.qrcode_2.js') {
                        return array (  '_controller' => 'assetic.controller:render',  'name' => '44a923e',  'pos' => 1,  '_format' => 'js',  '_route' => '_assetic_44a923e_1',);
                    }

                }

                // _assetic_44a923e_2
                if ($pathinfo === '/js/44a923e_custom_3.js') {
                    return array (  '_controller' => 'assetic.controller:render',  'name' => '44a923e',  'pos' => 2,  '_format' => 'js',  '_route' => '_assetic_44a923e_2',);
                }

            }

        }

        if (0 === strpos($pathinfo, '/css/50630ae')) {
            // _assetic_50630ae
            if ($pathinfo === '/css/50630ae.css') {
                return array (  '_controller' => 'assetic.controller:render',  'name' => '50630ae',  'pos' => NULL,  '_format' => 'css',  '_route' => '_assetic_50630ae',);
            }

            // _assetic_50630ae_0
            if ($pathinfo === '/css/50630ae_custom_1.css') {
                return array (  '_controller' => 'assetic.controller:render',  'name' => '50630ae',  'pos' => 0,  '_format' => 'css',  '_route' => '_assetic_50630ae_0',);
            }

        }

        if (0 === strpos($pathinfo, '/js/ebf5381')) {
            // _assetic_ebf5381
            if ($pathinfo === '/js/ebf5381.js') {
                return array (  '_controller' => 'assetic.controller:render',  'name' => 'ebf5381',  'pos' => NULL,  '_format' => 'js',  '_route' => '_assetic_ebf5381',);
            }

            if (0 === strpos($pathinfo, '/js/ebf5381_')) {
                if (0 === strpos($pathinfo, '/js/ebf5381_jquery')) {
                    // _assetic_ebf5381_0
                    if ($pathinfo === '/js/ebf5381_jquery_1.js') {
                        return array (  '_controller' => 'assetic.controller:render',  'name' => 'ebf5381',  'pos' => 0,  '_format' => 'js',  '_route' => '_assetic_ebf5381_0',);
                    }

                    if (0 === strpos($pathinfo, '/js/ebf5381_jquery.')) {
                        // _assetic_ebf5381_1
                        if ($pathinfo === '/js/ebf5381_jquery.qrcode_2.js') {
                            return array (  '_controller' => 'assetic.controller:render',  'name' => 'ebf5381',  'pos' => 1,  '_format' => 'js',  '_route' => '_assetic_ebf5381_1',);
                        }

                        // _assetic_ebf5381_2
                        if ($pathinfo === '/js/ebf5381_jquery.canvasjs.min_3.js') {
                            return array (  '_controller' => 'assetic.controller:render',  'name' => 'ebf5381',  'pos' => 2,  '_format' => 'js',  '_route' => '_assetic_ebf5381_2',);
                        }

                    }

                }

                // _assetic_ebf5381_3
                if ($pathinfo === '/js/ebf5381_custom_4.js') {
                    return array (  '_controller' => 'assetic.controller:render',  'name' => 'ebf5381',  'pos' => 3,  '_format' => 'js',  '_route' => '_assetic_ebf5381_3',);
                }

            }

        }

        if (0 === strpos($pathinfo, '/_')) {
            // _wdt
            if (0 === strpos($pathinfo, '/_wdt') && preg_match('#^/_wdt/(?P<token>[^/]++)$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => '_wdt')), array (  '_controller' => 'web_profiler.controller.profiler:toolbarAction',));
            }

            if (0 === strpos($pathinfo, '/_profiler')) {
                // _profiler_home
                if (rtrim($pathinfo, '/') === '/_profiler') {
                    if (substr($pathinfo, -1) !== '/') {
                        return $this->redirect($pathinfo.'/', '_profiler_home');
                    }

                    return array (  '_controller' => 'web_profiler.controller.profiler:homeAction',  '_route' => '_profiler_home',);
                }

                if (0 === strpos($pathinfo, '/_profiler/search')) {
                    // _profiler_search
                    if ($pathinfo === '/_profiler/search') {
                        return array (  '_controller' => 'web_profiler.controller.profiler:searchAction',  '_route' => '_profiler_search',);
                    }

                    // _profiler_search_bar
                    if ($pathinfo === '/_profiler/search_bar') {
                        return array (  '_controller' => 'web_profiler.controller.profiler:searchBarAction',  '_route' => '_profiler_search_bar',);
                    }

                }

                // _profiler_purge
                if ($pathinfo === '/_profiler/purge') {
                    return array (  '_controller' => 'web_profiler.controller.profiler:purgeAction',  '_route' => '_profiler_purge',);
                }

                // _profiler_info
                if (0 === strpos($pathinfo, '/_profiler/info') && preg_match('#^/_profiler/info/(?P<about>[^/]++)$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler_info')), array (  '_controller' => 'web_profiler.controller.profiler:infoAction',));
                }

                // _profiler_phpinfo
                if ($pathinfo === '/_profiler/phpinfo') {
                    return array (  '_controller' => 'web_profiler.controller.profiler:phpinfoAction',  '_route' => '_profiler_phpinfo',);
                }

                // _profiler_search_results
                if (preg_match('#^/_profiler/(?P<token>[^/]++)/search/results$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler_search_results')), array (  '_controller' => 'web_profiler.controller.profiler:searchResultsAction',));
                }

                // _profiler
                if (preg_match('#^/_profiler/(?P<token>[^/]++)$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler')), array (  '_controller' => 'web_profiler.controller.profiler:panelAction',));
                }

                // _profiler_router
                if (preg_match('#^/_profiler/(?P<token>[^/]++)/router$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler_router')), array (  '_controller' => 'web_profiler.controller.router:panelAction',));
                }

                // _profiler_exception
                if (preg_match('#^/_profiler/(?P<token>[^/]++)/exception$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler_exception')), array (  '_controller' => 'web_profiler.controller.exception:showAction',));
                }

                // _profiler_exception_css
                if (preg_match('#^/_profiler/(?P<token>[^/]++)/exception\\.css$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler_exception_css')), array (  '_controller' => 'web_profiler.controller.exception:cssAction',));
                }

            }

            // _twig_error_test
            if (0 === strpos($pathinfo, '/_error') && preg_match('#^/_error/(?P<code>\\d+)(?:\\.(?P<_format>[^/]++))?$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => '_twig_error_test')), array (  '_controller' => 'twig.controller.preview_error:previewErrorPageAction',  '_format' => 'html',));
            }

        }

        if (0 === strpos($pathinfo, '/log')) {
            if (0 === strpos($pathinfo, '/login')) {
                // fos_user_security_login
                if ($pathinfo === '/login') {
                    if (!in_array($this->context->getMethod(), array('GET', 'POST', 'HEAD'))) {
                        $allow = array_merge($allow, array('GET', 'POST', 'HEAD'));
                        goto not_fos_user_security_login;
                    }

                    return array (  '_controller' => 'FOS\\UserBundle\\Controller\\SecurityController::loginAction',  '_route' => 'fos_user_security_login',);
                }
                not_fos_user_security_login:

                // fos_user_security_check
                if ($pathinfo === '/login_check') {
                    if ($this->context->getMethod() != 'POST') {
                        $allow[] = 'POST';
                        goto not_fos_user_security_check;
                    }

                    return array (  '_controller' => 'FOS\\UserBundle\\Controller\\SecurityController::checkAction',  '_route' => 'fos_user_security_check',);
                }
                not_fos_user_security_check:

            }

            // fos_user_security_logout
            if ($pathinfo === '/logout') {
                if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                    $allow = array_merge($allow, array('GET', 'HEAD'));
                    goto not_fos_user_security_logout;
                }

                return array (  '_controller' => 'FOS\\UserBundle\\Controller\\SecurityController::logoutAction',  '_route' => 'fos_user_security_logout',);
            }
            not_fos_user_security_logout:

        }

        if (0 === strpos($pathinfo, '/profile')) {
            // fos_user_profile_show
            if (rtrim($pathinfo, '/') === '/profile') {
                if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                    $allow = array_merge($allow, array('GET', 'HEAD'));
                    goto not_fos_user_profile_show;
                }

                if (substr($pathinfo, -1) !== '/') {
                    return $this->redirect($pathinfo.'/', 'fos_user_profile_show');
                }

                return array (  '_controller' => 'FOS\\UserBundle\\Controller\\ProfileController::showAction',  '_route' => 'fos_user_profile_show',);
            }
            not_fos_user_profile_show:

            // fos_user_profile_edit
            if ($pathinfo === '/profile/edit') {
                if (!in_array($this->context->getMethod(), array('GET', 'POST', 'HEAD'))) {
                    $allow = array_merge($allow, array('GET', 'POST', 'HEAD'));
                    goto not_fos_user_profile_edit;
                }

                return array (  '_controller' => 'FOS\\UserBundle\\Controller\\ProfileController::editAction',  '_route' => 'fos_user_profile_edit',);
            }
            not_fos_user_profile_edit:

        }

        if (0 === strpos($pathinfo, '/re')) {
            if (0 === strpos($pathinfo, '/register')) {
                // fos_user_registration_register
                if (rtrim($pathinfo, '/') === '/register') {
                    if (!in_array($this->context->getMethod(), array('GET', 'POST', 'HEAD'))) {
                        $allow = array_merge($allow, array('GET', 'POST', 'HEAD'));
                        goto not_fos_user_registration_register;
                    }

                    if (substr($pathinfo, -1) !== '/') {
                        return $this->redirect($pathinfo.'/', 'fos_user_registration_register');
                    }

                    return array (  '_controller' => 'FOS\\UserBundle\\Controller\\RegistrationController::registerAction',  '_route' => 'fos_user_registration_register',);
                }
                not_fos_user_registration_register:

                if (0 === strpos($pathinfo, '/register/c')) {
                    // fos_user_registration_check_email
                    if ($pathinfo === '/register/check-email') {
                        if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                            $allow = array_merge($allow, array('GET', 'HEAD'));
                            goto not_fos_user_registration_check_email;
                        }

                        return array (  '_controller' => 'FOS\\UserBundle\\Controller\\RegistrationController::checkEmailAction',  '_route' => 'fos_user_registration_check_email',);
                    }
                    not_fos_user_registration_check_email:

                    if (0 === strpos($pathinfo, '/register/confirm')) {
                        // fos_user_registration_confirm
                        if (preg_match('#^/register/confirm/(?P<token>[^/]++)$#s', $pathinfo, $matches)) {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_fos_user_registration_confirm;
                            }

                            return $this->mergeDefaults(array_replace($matches, array('_route' => 'fos_user_registration_confirm')), array (  '_controller' => 'FOS\\UserBundle\\Controller\\RegistrationController::confirmAction',));
                        }
                        not_fos_user_registration_confirm:

                        // fos_user_registration_confirmed
                        if ($pathinfo === '/register/confirmed') {
                            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                                $allow = array_merge($allow, array('GET', 'HEAD'));
                                goto not_fos_user_registration_confirmed;
                            }

                            return array (  '_controller' => 'FOS\\UserBundle\\Controller\\RegistrationController::confirmedAction',  '_route' => 'fos_user_registration_confirmed',);
                        }
                        not_fos_user_registration_confirmed:

                    }

                }

            }

            if (0 === strpos($pathinfo, '/resetting')) {
                // fos_user_resetting_request
                if ($pathinfo === '/resetting/request') {
                    if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                        $allow = array_merge($allow, array('GET', 'HEAD'));
                        goto not_fos_user_resetting_request;
                    }

                    return array (  '_controller' => 'FOS\\UserBundle\\Controller\\ResettingController::requestAction',  '_route' => 'fos_user_resetting_request',);
                }
                not_fos_user_resetting_request:

                // fos_user_resetting_send_email
                if ($pathinfo === '/resetting/send-email') {
                    if ($this->context->getMethod() != 'POST') {
                        $allow[] = 'POST';
                        goto not_fos_user_resetting_send_email;
                    }

                    return array (  '_controller' => 'FOS\\UserBundle\\Controller\\ResettingController::sendEmailAction',  '_route' => 'fos_user_resetting_send_email',);
                }
                not_fos_user_resetting_send_email:

                // fos_user_resetting_check_email
                if ($pathinfo === '/resetting/check-email') {
                    if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                        $allow = array_merge($allow, array('GET', 'HEAD'));
                        goto not_fos_user_resetting_check_email;
                    }

                    return array (  '_controller' => 'FOS\\UserBundle\\Controller\\ResettingController::checkEmailAction',  '_route' => 'fos_user_resetting_check_email',);
                }
                not_fos_user_resetting_check_email:

                // fos_user_resetting_reset
                if (0 === strpos($pathinfo, '/resetting/reset') && preg_match('#^/resetting/reset/(?P<token>[^/]++)$#s', $pathinfo, $matches)) {
                    if (!in_array($this->context->getMethod(), array('GET', 'POST', 'HEAD'))) {
                        $allow = array_merge($allow, array('GET', 'POST', 'HEAD'));
                        goto not_fos_user_resetting_reset;
                    }

                    return $this->mergeDefaults(array_replace($matches, array('_route' => 'fos_user_resetting_reset')), array (  '_controller' => 'FOS\\UserBundle\\Controller\\ResettingController::resetAction',));
                }
                not_fos_user_resetting_reset:

            }

        }

        // fos_user_change_password
        if ($pathinfo === '/profile/change-password') {
            if (!in_array($this->context->getMethod(), array('GET', 'POST', 'HEAD'))) {
                $allow = array_merge($allow, array('GET', 'POST', 'HEAD'));
                goto not_fos_user_change_password;
            }

            return array (  '_controller' => 'FOS\\UserBundle\\Controller\\ChangePasswordController::changePasswordAction',  '_route' => 'fos_user_change_password',);
        }
        not_fos_user_change_password:

        if (0 === strpos($pathinfo, '/admin')) {
            // admin
            if ($pathinfo === '/admin') {
                return array (  '_controller' => 'DigitalArtLabBundle\\Controller\\AdminController::adminIndexAction',  '_route' => 'admin',);
            }

            // admin_usermanager
            if ($pathinfo === '/admin/gebruikersbeheer') {
                return array (  '_controller' => 'DigitalArtLabBundle\\Controller\\AdminController::adminUsermanagerAction',  '_route' => 'admin_usermanager',);
            }

        }

        // homepage
        if (rtrim($pathinfo, '/') === '') {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($pathinfo.'/', 'homepage');
            }

            return array (  '_controller' => 'DigitalArtLabBundle\\Controller\\DefaultController::indexAction',  '_route' => 'homepage',);
        }

        // admin_stats
        if (rtrim($pathinfo, '/') === '/admin/stats') {
            if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                $allow = array_merge($allow, array('GET', 'HEAD'));
                goto not_admin_stats;
            }

            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($pathinfo.'/', 'admin_stats');
            }

            return array (  '_controller' => 'DigitalArtLabBundle\\Controller\\StatestiekenController::indexAction',  '_route' => 'admin_stats',);
        }
        not_admin_stats:

        if (0 === strpos($pathinfo, '/profile')) {
            // userprofile
            if (preg_match('#^/profile/(?P<username>[^/]++)$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => 'userprofile')), array (  '_controller' => 'DigitalArtLabBundle\\Controller\\checkinController::showOtherAction',));
            }

            // digitalartlab_checkin_edituserprofile
            if (preg_match('#^/profile/(?P<username>[^/]++)/edit$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => 'digitalartlab_checkin_edituserprofile')), array (  '_controller' => 'DigitalArtLabBundle\\Controller\\checkinController::editUserProfileAction',));
            }

            // checkin
            if (preg_match('#^/profile/(?P<username>[^/]++)/checkin$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => 'checkin')), array (  '_controller' => 'DigitalArtLabBundle\\Controller\\checkinController::checkinAction',));
            }

        }

        // admin_checkin
        if ($pathinfo === '/admin/sessions') {
            return array (  '_controller' => 'DigitalArtLabBundle\\Controller\\checkinController::checkinHistoryAction',  '_route' => 'admin_checkin',);
        }

        // print_user
        if (0 === strpos($pathinfo, '/profile') && preg_match('#^/profile/(?P<username>[^/]++)/print$#s', $pathinfo, $matches)) {
            return $this->mergeDefaults(array_replace($matches, array('_route' => 'print_user')), array (  '_controller' => 'DigitalArtLabBundle\\Controller\\checkinController::printCardAction',));
        }

        if (0 === strpos($pathinfo, '/admin/transaction')) {
            // admin_transaction
            if (rtrim($pathinfo, '/') === '/admin/transaction') {
                if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                    $allow = array_merge($allow, array('GET', 'HEAD'));
                    goto not_admin_transaction;
                }

                if (substr($pathinfo, -1) !== '/') {
                    return $this->redirect($pathinfo.'/', 'admin_transaction');
                }

                return array (  '_controller' => 'DigitalArtLabBundle\\Controller\\transactionController::indexAction',  '_route' => 'admin_transaction',);
            }
            not_admin_transaction:

            // admin_transaction_create
            if ($pathinfo === '/admin/transaction/') {
                if ($this->context->getMethod() != 'POST') {
                    $allow[] = 'POST';
                    goto not_admin_transaction_create;
                }

                return array (  '_controller' => 'DigitalArtLabBundle\\Controller\\transactionController::createAction',  '_route' => 'admin_transaction_create',);
            }
            not_admin_transaction_create:

            // admin_transaction_new
            if ($pathinfo === '/admin/transaction/new') {
                if (!in_array($this->context->getMethod(), array('GET', 'HEAD'))) {
                    $allow = array_merge($allow, array('GET', 'HEAD'));
                    goto not_admin_transaction_new;
                }

                return array (  '_controller' => 'DigitalArtLabBundle\\Controller\\transactionController::newAction',  '_route' => 'admin_transaction_new',);
            }
            not_admin_transaction_new:

        }

        // DigitalArtLabBundle_ajax_create_transaction
        if ($pathinfo === '/create/new/transaction/ajax/call') {
            return array (  '_controller' => 'DigitalArtLabBundle\\Controller\\AdminController::createTransactionAction',  '_route' => 'DigitalArtLabBundle_ajax_create_transaction',);
        }

        throw 0 < count($allow) ? new MethodNotAllowedException(array_unique($allow)) : new ResourceNotFoundException();
    }
}
