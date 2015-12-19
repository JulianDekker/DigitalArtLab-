<?php

/* DigitalArtLabBundle:Admin:usermanager.html.twig */
class __TwigTemplate_93b547f668cfdc760e75a0b27ae7b30f785c9e8f5d40fcd2710046e49056f8f0 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("::base.html.twig", "DigitalArtLabBundle:Admin:usermanager.html.twig", 1);
        $this->blocks = array(
            'body' => array($this, 'block_body'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "::base.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_body($context, array $blocks = array())
    {
        // line 4
        echo "<div class=\"content-container\">

    <h2 class=\"h2\">Gebruikersbeheer</h2><div id=\"response-message\"></div>
    <div class=\"btn-fill admin_button_container\">
        <a href=\"";
        // line 8
        echo $this->env->getExtension('routing')->getPath("admin");
        echo "\" class=\"button\">Terug naar overzicht</a>
        <a href=\"";
        // line 9
        echo $this->env->getExtension('routing')->getPath("fos_user_registration_register");
        echo "\" class=\"button\">Gebruiker toevoegen</a>
    </div>

    <table class=\"usermanager\">
        <tr class=\"th\">
            <th>Gebruikersnaam</th>
            <th>Volledige naam</th>
            <th>Saldo</th>
            <th>Aanwezig</th>
        </tr>
        ";
        // line 19
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable($context["users"]);
        $context['loop'] = array(
          'parent' => $context['_parent'],
          'index0' => 0,
          'index'  => 1,
          'first'  => true,
        );
        if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof Countable)) {
            $length = count($context['_seq']);
            $context['loop']['revindex0'] = $length - 1;
            $context['loop']['revindex'] = $length;
            $context['loop']['length'] = $length;
            $context['loop']['last'] = 1 === $length;
        }
        foreach ($context['_seq'] as $context["_key"] => $context["users"]) {
            // line 20
            echo "            <tbody class=\"tr-group\">
            <tr class=\"user\">
                <td colspan=\"4\"></td>
            </tr>
            <tr class=\"user\">
                <td>";
            // line 25
            echo twig_escape_filter($this->env, $this->getAttribute($context["users"], "username", array()), "html", null, true);
            echo "</td>
                <td>";
            // line 26
            echo twig_escape_filter($this->env, $this->getAttribute($context["users"], "firstname", array()), "html", null, true);
            echo " ";
            echo twig_escape_filter($this->env, $this->getAttribute($context["users"], "lastname", array()), "html", null, true);
            echo "</td>
                <td id=\"";
            // line 27
            echo twig_escape_filter($this->env, $this->getAttribute($context["users"], "username", array()), "html", null, true);
            echo "\">";
            echo twig_escape_filter($this->env, $this->getAttribute($context["users"], "saldo", array()), "html", null, true);
            echo "</td>
                <td>
                ";
            // line 29
            if (($this->getAttribute($context["users"], "aanwezig", array()) == 1)) {
                // line 30
                echo "                    In het lab
                ";
            } elseif (((null === $this->getAttribute(            // line 31
$context["users"], "aanwezig", array())) || twig_test_empty($this->getAttribute($context["users"], "aanwezig", array())))) {
                // line 32
                echo "                    nog niet geweest
                ";
            } elseif (($this->getAttribute(            // line 33
$context["users"], "aanwezig", array()) == 0)) {
                // line 34
                echo "                    Niet aanwezig
                ";
            }
            // line 36
            echo "                </td>

            </tr>
            <tr class=\"actions-row\">
                <td><a href=\"";
            // line 40
            echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("userprofile", array("username" => $this->getAttribute($context["users"], "username", array()))), "html", null, true);
            echo "\">Bekijk profiel</a></td>
                <td><a href=\"#\" onclick=\"appendFrame( '";
            // line 41
            echo twig_escape_filter($this->env, $this->getAttribute($context["users"], "username", array()), "html", null, true);
            echo "', ";
            echo twig_escape_filter($this->env, $this->getAttribute($context["loop"], "index", array()), "html", null, true);
            echo " ); frames['frame";
            echo twig_escape_filter($this->env, $this->getAttribute($context["loop"], "index", array()), "html", null, true);
            echo "'].print();\" >Print pas</a></td>
                <td><a href=\"#\" class=\"opensaldoform\">Saldo wijzigen</a></td>
                <td>
                    <a href=\"";
            // line 44
            echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("checkin", array("username" => $this->getAttribute($context["users"], "username", array()))), "html", null, true);
            echo "\">
                        ";
            // line 45
            if (($this->getAttribute($context["users"], "aanwezig", array()) == 1)) {
                // line 46
                echo "                            Afmelden
                        ";
            } elseif (($this->getAttribute(            // line 47
$context["users"], "aanwezig", array()) == 0)) {
                // line 48
                echo "                            Aanmelden
                        ";
            }
            // line 50
            echo "                    </a>
                </td>
            </tr>
            <tr>
                <td colspan=\"4\">
                    <form class=\"user_transaction_form\">
                        <label>Gebruikersnaam: </label><input type=\"text\" value=\"";
            // line 56
            echo twig_escape_filter($this->env, $this->getAttribute($context["users"], "username", array()), "html", null, true);
            echo "\" disabled=\"disabled\" />
                        <label>Hoeveelheid: </label><input type=\"number\">
                        <input type=\"submit\" value=\"Bij/Afschrijven\" class=\"transactionbutton\">
                    </form>
                </td>
            </tr>
            </tbody>
        ";
            ++$context['loop']['index0'];
            ++$context['loop']['index'];
            $context['loop']['first'] = false;
            if (isset($context['loop']['length'])) {
                --$context['loop']['revindex0'];
                --$context['loop']['revindex'];
                $context['loop']['last'] = 0 === $context['loop']['revindex0'];
            }
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['users'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 64
        echo "    </table>
</div>
<script>

    \$(document).ready(function(){
        \$('.transactionbutton').on('click', function(event){
            event.preventDefault();
            var user = \$(this).parent().find('input[type=\"text\"]').val();
            var amount = \$(this).parent().find('input[type=\"number\"]').val();
            var parent = \$(this).parent().parent().parent();
            acreateTransaction(user,amount,parent);
        });

    });

    function acreateTransaction(user, amount, parent){
        console.log(user, amount);
        \$.post(
            '";
        // line 82
        echo $this->env->getExtension('routing')->getPath("DigitalArtLabBundle_ajax_create_transaction");
        echo "',
            {userdata: user, amountdata: amount},
            function(response){
                if(response.code == 100 && response.success){//dummy check
                    var count = \$('#'+user).text();
                    \$('#'+user).prop('Counter',count).animate({
                        Counter: response.newsaldo
                    }, {
                        duration: 500,
                        easing: 'swing',
                        step: function (now) {
                            \$(this).text(Math.ceil(now));
                        }
                    });
                    \$(parent).find('.user_transaction_form').slideToggle().find('input[type=\"number\"]').val(null);
                    \$('#response-message').addClass('succes').removeClass('error').text('Transactie geslaagd! saldo van '+ user+ ' aangepast .' );
                }
                if(response.code == 200 || response.success == false){
                    \$('#response-message').addClass('error').removeClass('succes').text('Transactie mislukt, gebruiker '+ user + ' Heeft niet genoeg saldo.');
                }

            }, \"json\");
    }
</script>

";
    }

    public function getTemplateName()
    {
        return "DigitalArtLabBundle:Admin:usermanager.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  196 => 82,  176 => 64,  154 => 56,  146 => 50,  142 => 48,  140 => 47,  137 => 46,  135 => 45,  131 => 44,  121 => 41,  117 => 40,  111 => 36,  107 => 34,  105 => 33,  102 => 32,  100 => 31,  97 => 30,  95 => 29,  88 => 27,  82 => 26,  78 => 25,  71 => 20,  54 => 19,  41 => 9,  37 => 8,  31 => 4,  28 => 3,  11 => 1,);
    }
}
/* {% extends '::base.html.twig' %}*/
/* */
/* {% block body -%}*/
/* <div class="content-container">*/
/* */
/*     <h2 class="h2">Gebruikersbeheer</h2><div id="response-message"></div>*/
/*     <div class="btn-fill admin_button_container">*/
/*         <a href="{{ path('admin') }}" class="button">Terug naar overzicht</a>*/
/*         <a href="{{ path('fos_user_registration_register') }}" class="button">Gebruiker toevoegen</a>*/
/*     </div>*/
/* */
/*     <table class="usermanager">*/
/*         <tr class="th">*/
/*             <th>Gebruikersnaam</th>*/
/*             <th>Volledige naam</th>*/
/*             <th>Saldo</th>*/
/*             <th>Aanwezig</th>*/
/*         </tr>*/
/*         {% for users in users %}*/
/*             <tbody class="tr-group">*/
/*             <tr class="user">*/
/*                 <td colspan="4"></td>*/
/*             </tr>*/
/*             <tr class="user">*/
/*                 <td>{{ users.username }}</td>*/
/*                 <td>{{ users.firstname }} {{ users.lastname }}</td>*/
/*                 <td id="{{ users.username }}">{{ users.saldo }}</td>*/
/*                 <td>*/
/*                 {% if users.aanwezig == 1 %}*/
/*                     In het lab*/
/*                 {% elseif users.aanwezig is null or users.aanwezig is empty %}*/
/*                     nog niet geweest*/
/*                 {% elseif users.aanwezig == 0 %}*/
/*                     Niet aanwezig*/
/*                 {% endif %}*/
/*                 </td>*/
/* */
/*             </tr>*/
/*             <tr class="actions-row">*/
/*                 <td><a href="{{ path('userprofile', {'username': users.username}) }}">Bekijk profiel</a></td>*/
/*                 <td><a href="#" onclick="appendFrame( '{{ users.username }}', {{ loop.index }} ); frames['frame{{ loop.index }}'].print();" >Print pas</a></td>*/
/*                 <td><a href="#" class="opensaldoform">Saldo wijzigen</a></td>*/
/*                 <td>*/
/*                     <a href="{{ path('checkin', {'username': users.username}) }}">*/
/*                         {% if users.aanwezig == 1 %}*/
/*                             Afmelden*/
/*                         {% elseif users.aanwezig == 0 %}*/
/*                             Aanmelden*/
/*                         {% endif %}*/
/*                     </a>*/
/*                 </td>*/
/*             </tr>*/
/*             <tr>*/
/*                 <td colspan="4">*/
/*                     <form class="user_transaction_form">*/
/*                         <label>Gebruikersnaam: </label><input type="text" value="{{ users.username }}" disabled="disabled" />*/
/*                         <label>Hoeveelheid: </label><input type="number">*/
/*                         <input type="submit" value="Bij/Afschrijven" class="transactionbutton">*/
/*                     </form>*/
/*                 </td>*/
/*             </tr>*/
/*             </tbody>*/
/*         {% endfor %}*/
/*     </table>*/
/* </div>*/
/* <script>*/
/* */
/*     $(document).ready(function(){*/
/*         $('.transactionbutton').on('click', function(event){*/
/*             event.preventDefault();*/
/*             var user = $(this).parent().find('input[type="text"]').val();*/
/*             var amount = $(this).parent().find('input[type="number"]').val();*/
/*             var parent = $(this).parent().parent().parent();*/
/*             acreateTransaction(user,amount,parent);*/
/*         });*/
/* */
/*     });*/
/* */
/*     function acreateTransaction(user, amount, parent){*/
/*         console.log(user, amount);*/
/*         $.post(*/
/*             '{{path('DigitalArtLabBundle_ajax_create_transaction')}}',*/
/*             {userdata: user, amountdata: amount},*/
/*             function(response){*/
/*                 if(response.code == 100 && response.success){//dummy check*/
/*                     var count = $('#'+user).text();*/
/*                     $('#'+user).prop('Counter',count).animate({*/
/*                         Counter: response.newsaldo*/
/*                     }, {*/
/*                         duration: 500,*/
/*                         easing: 'swing',*/
/*                         step: function (now) {*/
/*                             $(this).text(Math.ceil(now));*/
/*                         }*/
/*                     });*/
/*                     $(parent).find('.user_transaction_form').slideToggle().find('input[type="number"]').val(null);*/
/*                     $('#response-message').addClass('succes').removeClass('error').text('Transactie geslaagd! saldo van '+ user+ ' aangepast .' );*/
/*                 }*/
/*                 if(response.code == 200 || response.success == false){*/
/*                     $('#response-message').addClass('error').removeClass('succes').text('Transactie mislukt, gebruiker '+ user + ' Heeft niet genoeg saldo.');*/
/*                 }*/
/* */
/*             }, "json");*/
/*     }*/
/* </script>*/
/* */
/* {% endblock %}*/
