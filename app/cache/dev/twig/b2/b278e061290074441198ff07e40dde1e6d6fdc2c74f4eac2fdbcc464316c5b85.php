<?php

/* FOSUserBundle:Profile:show_content.html.twig */
class __TwigTemplate_55582d97d5605bd9bfe9af0ef31a9f2a173011be978dfbe4f35c0783cedbecff extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_f61f301059edf7b75ae2c2f1c4eaec5f3632be08311065b1290ba45c80ba5eda = $this->env->getExtension("native_profiler");
        $__internal_f61f301059edf7b75ae2c2f1c4eaec5f3632be08311065b1290ba45c80ba5eda->enter($__internal_f61f301059edf7b75ae2c2f1c4eaec5f3632be08311065b1290ba45c80ba5eda_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Profile:show_content.html.twig"));

        // line 2
        echo "<div class=\"content-container\">
    <div class=\"main-content\">
        <h2 class=\"h2\">";
        // line 4
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "username", array()), "html", null, true);
        echo "'s profiel</h2>
        <div class=\"fos_user_user_show\">
            <p class=\"title\">Gebruikersnaam:</p>
            <p class=\"row\">";
        // line 7
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "username", array()), "html", null, true);
        echo "</p>
            <p class=\"title\">Volledige naam:</p>
            <p class=\"row\">";
        // line 9
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "firstname", array()), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "lastname", array()), "html", null, true);
        echo "</p>
            <p class=\"title\">Email:</p>
            <p class=\"row\">";
        // line 11
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "email", array()), "html", null, true);
        echo "</p>
            <p class=\"title\">interesses:</p>
            <p class=\"row\">";
        // line 13
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "interesses", array()), "html", null, true);
        echo "</p>
            <p class=\"title\">expertises:</p>
            <p class=\"row\">";
        // line 15
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "expertises", array()), "html", null, true);
        echo "</p>
            <p class=\"title\">Status:</p>
            <p class=\"row\">
                ";
        // line 18
        if (($this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "aanwezig", array()) == 1)) {
            // line 19
            echo "                    In het lab
                ";
        } elseif (((null === $this->getAttribute(        // line 20
(isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "aanwezig", array())) || twig_test_empty($this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "aanwezig", array())))) {
            // line 21
            echo "                    nog niet in het lab geweest
                ";
        } elseif (($this->getAttribute(        // line 22
(isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "aanwezig", array()) == 0)) {
            // line 23
            echo "                    Niet aanwezig
                ";
        }
        // line 25
        echo "            </p>
        </div>
        ";
        // line 27
        if (($this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "username", array()) == $this->getAttribute($this->getAttribute((isset($context["app"]) ? $context["app"] : $this->getContext($context, "app")), "user", array()), "username", array()))) {
            echo "<a href=\"";
            echo $this->env->getExtension('routing')->getPath("fos_user_profile_edit");
            echo "\">Bewerk gegevens</a>";
        }
        // line 28
        echo "    </div>
    <div class=\"side-content stats\">
        <h2 class=\"h2\">Stats</h2>
        <div id=\"response-message\"></div>
        ";
        // line 32
        if (($this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "aanwezig", array()) == 1)) {
            // line 33
            echo "            <a href=\"";
            echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("checkin", array("username" => $this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "username", array()))), "html", null, true);
            echo "\">Afmelden</a><br>
        ";
        } elseif (($this->getAttribute(        // line 34
(isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "aanwezig", array()) == 0)) {
            // line 35
            echo "            <a href=\"";
            echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("checkin", array("username" => $this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "username", array()))), "html", null, true);
            echo "\">Aanmelden</a><br>
        ";
        }
        // line 37
        echo "        <a href=\"#\" class=\"opensaldoform userform\">Saldo Wijzigen</a>
        <form class=\"user_transaction_form\">
            <label>Gebruikersnaam: </label><input type=\"text\" value=\"";
        // line 39
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "username", array()), "html", null, true);
        echo "\" disabled=\"disabled\" />
            <label>Hoeveelheid: </label><input type=\"number\">
            <input type=\"submit\" value=\"Bij/Afschrijven\" class=\"transactionbutton\">
        </form>
        <hr>
        ";
        // line 44
        $context["sumratingsH"] = "0";
        // line 45
        echo "        ";
        $context["sumratingsi"] = "0";
        // line 46
        echo "        ";
        $context["sumratingss"] = "0";
        // line 47
        echo "        ";
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["ses"]) ? $context["ses"] : $this->getContext($context, "ses")));
        foreach ($context['_seq'] as $context["_key"] => $context["session"]) {
            // line 48
            echo "            ";
            if ($this->getAttribute($context["session"], "sessionduration", array())) {
                // line 49
                echo "                ";
                $context["sumratingsH"] = ((isset($context["sumratingsH"]) ? $context["sumratingsH"] : $this->getContext($context, "sumratingsH")) + (twig_date_format_filter($this->env, $this->getAttribute($context["session"], "sessionduration", array()), "H") / twig_length_filter($this->env, (isset($context["ses"]) ? $context["ses"] : $this->getContext($context, "ses")))));
                // line 50
                echo "                ";
                $context["sumratingsi"] = ((isset($context["sumratingsi"]) ? $context["sumratingsi"] : $this->getContext($context, "sumratingsi")) + (twig_date_format_filter($this->env, $this->getAttribute($context["session"], "sessionduration", array()), "i") / twig_length_filter($this->env, (isset($context["ses"]) ? $context["ses"] : $this->getContext($context, "ses")))));
                // line 51
                echo "                ";
                $context["sumratingss"] = ((isset($context["sumratingss"]) ? $context["sumratingss"] : $this->getContext($context, "sumratingss")) + (twig_date_format_filter($this->env, $this->getAttribute($context["session"], "sessionduration", array()), "s") / twig_length_filter($this->env, (isset($context["ses"]) ? $context["ses"] : $this->getContext($context, "ses")))));
                // line 52
                echo "            ";
            }
            // line 53
            echo "        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['session'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 54
        echo "        ";
        $context["sumratingshl"] = (((isset($context["sumratingsH"]) ? $context["sumratingsH"] : $this->getContext($context, "sumratingsH")) - twig_round((isset($context["sumratingsH"]) ? $context["sumratingsH"] : $this->getContext($context, "sumratingsH")), 0, "floor")) * 60);
        // line 55
        echo "        ";
        $context["sumratingsi"] = ((isset($context["sumratingsi"]) ? $context["sumratingsi"] : $this->getContext($context, "sumratingsi")) + (isset($context["sumratingshl"]) ? $context["sumratingshl"] : $this->getContext($context, "sumratingshl")));
        // line 56
        echo "        ";
        if (((isset($context["sumratingsi"]) ? $context["sumratingsi"] : $this->getContext($context, "sumratingsi")) > 60)) {
            // line 57
            echo "            ";
            $context["sumratingsi"] = ((isset($context["sumratingsi"]) ? $context["sumratingsi"] : $this->getContext($context, "sumratingsi")) / 60);
            // line 58
            echo "            ";
            $context["sumratingsH"] = ((isset($context["sumratingsH"]) ? $context["sumratingsH"] : $this->getContext($context, "sumratingsH")) + twig_round((isset($context["sumratingsi"]) ? $context["sumratingsi"] : $this->getContext($context, "sumratingsi")), 0, "floor"));
            // line 59
            echo "            ";
            $context["sumratingsi"] = (((isset($context["sumratingsi"]) ? $context["sumratingsi"] : $this->getContext($context, "sumratingsi")) - twig_round((isset($context["sumratingsi"]) ? $context["sumratingsi"] : $this->getContext($context, "sumratingsi")), 0, "floor")) * 60);
            // line 60
            echo "        ";
        }
        // line 61
        echo "        ";
        $context["sumratingsil"] = (((isset($context["sumratingsi"]) ? $context["sumratingsi"] : $this->getContext($context, "sumratingsi")) - twig_round((isset($context["sumratingsi"]) ? $context["sumratingsi"] : $this->getContext($context, "sumratingsi")), 0, "floor")) * 60);
        // line 62
        echo "        ";
        $context["sumratingss"] = ((isset($context["sumratingss"]) ? $context["sumratingss"] : $this->getContext($context, "sumratingss")) + (isset($context["sumratingsil"]) ? $context["sumratingsil"] : $this->getContext($context, "sumratingsil")));
        // line 63
        echo "        ";
        if (((isset($context["sumratingss"]) ? $context["sumratingss"] : $this->getContext($context, "sumratingss")) > 60)) {
            // line 64
            echo "            ";
            $context["sumratingss"] = ((isset($context["sumratingss"]) ? $context["sumratingss"] : $this->getContext($context, "sumratingss")) / 60);
            // line 65
            echo "            ";
            $context["sumratingsi"] = ((isset($context["sumratingsi"]) ? $context["sumratingsi"] : $this->getContext($context, "sumratingsi")) + twig_round((isset($context["sumratingss"]) ? $context["sumratingss"] : $this->getContext($context, "sumratingss")), 0, "floor"));
            // line 66
            echo "            ";
            $context["sumratingss"] = (((isset($context["sumratingss"]) ? $context["sumratingss"] : $this->getContext($context, "sumratingss")) - twig_round((isset($context["sumratingss"]) ? $context["sumratingss"] : $this->getContext($context, "sumratingss")), 0, "floor")) * 60);
            // line 67
            echo "        ";
        }
        // line 68
        echo "        <p>Gemiddelde sessieduur: ";
        echo twig_escape_filter($this->env, twig_round((isset($context["sumratingsH"]) ? $context["sumratingsH"] : $this->getContext($context, "sumratingsH")), 0, "floor"), "html", null, true);
        echo ":";
        echo twig_escape_filter($this->env, sprintf("%02d", twig_round((isset($context["sumratingsi"]) ? $context["sumratingsi"] : $this->getContext($context, "sumratingsi")), 0, "floor")), "html", null, true);
        echo ":";
        echo twig_escape_filter($this->env, sprintf("%02d", twig_round((isset($context["sumratingss"]) ? $context["sumratingss"] : $this->getContext($context, "sumratingss")))), "html", null, true);
        echo "</p>
        <p>Huidig saldo: <span id=\"";
        // line 69
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "username", array()), "html", null, true);
        echo "\">";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "saldo", array()), "html", null, true);
        echo "</span></p>

        ";
        // line 71
        if (($this->env->getExtension('security')->isGranted("ROLE_ADMIN") || ($this->getAttribute((isset($context["user"]) ? $context["user"] : $this->getContext($context, "user")), "username", array()) == $this->getAttribute($this->getAttribute((isset($context["app"]) ? $context["app"] : $this->getContext($context, "app")), "user", array()), "username", array())))) {
            // line 72
            echo "            ";
            if ((isset($context["ses"]) ? $context["ses"] : $this->getContext($context, "ses"))) {
                // line 73
                echo "                <h2 class=\"h2\">Sessies</h2>
                ";
                // line 74
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable((isset($context["ses"]) ? $context["ses"] : $this->getContext($context, "ses")));
                foreach ($context['_seq'] as $context["_key"] => $context["sessions"]) {
                    // line 75
                    echo "                    ";
                    if (((null === $this->getAttribute($context["sessions"], "timeout", array())) || twig_test_empty($this->getAttribute($context["sessions"], "timeout", array())))) {
                        // line 76
                        echo "                        <p>Aanwezig sinds ";
                        if ((twig_date_format_filter($this->env, $this->getAttribute($context["sessions"], "timein", array()), "d-m-Y") == twig_date_format_filter($this->env, "now", "d-m-Y"))) {
                            echo "vandaag";
                        } else {
                            echo twig_escape_filter($this->env, twig_date_format_filter($this->env, $this->getAttribute($context["sessions"], "timein", array()), "d-m-Y"), "html", null, true);
                            echo " om";
                        }
                        echo " ";
                        echo twig_escape_filter($this->env, twig_date_format_filter($this->env, $this->getAttribute($context["sessions"], "timein", array()), "H:i"), "html", null, true);
                        echo "</p></br>
                    ";
                    } else {
                        // line 78
                        echo "                        <p>In het lab geweest op ";
                        echo twig_escape_filter($this->env, twig_date_format_filter($this->env, $this->getAttribute($context["sessions"], "timein", array()), "d-m-Y"), "html", null, true);
                        echo " voor ";
                        echo twig_escape_filter($this->env, twig_date_format_filter($this->env, $this->getAttribute($context["sessions"], "sessionduration", array()), "H:i:s"), "html", null, true);
                        echo "</p></br>
                    ";
                    }
                    // line 80
                    echo "                ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['sessions'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 81
                echo "            ";
            }
            // line 82
            echo "        ";
        }
        // line 83
        echo "    </div>
</div>
<script>

    \$(document).ready(function(){
        \$('.transactionbutton').on('click', function(event){
            event.preventDefault();
            var user = \$(this).parent().find('input[type=\"text\"]').val();
            var amount = \$(this).parent().find('input[type=\"number\"]').val();
            var parent = \$('.side-content');
            acreateTransaction(user,amount,parent);
        });

    });

    function acreateTransaction(user, amount, parent){
        console.log(user, amount);
        \$.post(
                '";
        // line 101
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
</script>";
        
        $__internal_f61f301059edf7b75ae2c2f1c4eaec5f3632be08311065b1290ba45c80ba5eda->leave($__internal_f61f301059edf7b75ae2c2f1c4eaec5f3632be08311065b1290ba45c80ba5eda_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Profile:show_content.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  279 => 101,  259 => 83,  256 => 82,  253 => 81,  247 => 80,  239 => 78,  226 => 76,  223 => 75,  219 => 74,  216 => 73,  213 => 72,  211 => 71,  204 => 69,  195 => 68,  192 => 67,  189 => 66,  186 => 65,  183 => 64,  180 => 63,  177 => 62,  174 => 61,  171 => 60,  168 => 59,  165 => 58,  162 => 57,  159 => 56,  156 => 55,  153 => 54,  147 => 53,  144 => 52,  141 => 51,  138 => 50,  135 => 49,  132 => 48,  127 => 47,  124 => 46,  121 => 45,  119 => 44,  111 => 39,  107 => 37,  101 => 35,  99 => 34,  94 => 33,  92 => 32,  86 => 28,  80 => 27,  76 => 25,  72 => 23,  70 => 22,  67 => 21,  65 => 20,  62 => 19,  60 => 18,  54 => 15,  49 => 13,  44 => 11,  37 => 9,  32 => 7,  26 => 4,  22 => 2,);
    }
}
/* {% trans_default_domain 'FOSUserBundle' %}*/
/* <div class="content-container">*/
/*     <div class="main-content">*/
/*         <h2 class="h2">{{ user.username }}'s profiel</h2>*/
/*         <div class="fos_user_user_show">*/
/*             <p class="title">Gebruikersnaam:</p>*/
/*             <p class="row">{{ user.username }}</p>*/
/*             <p class="title">Volledige naam:</p>*/
/*             <p class="row">{{ user.firstname }} {{ user.lastname }}</p>*/
/*             <p class="title">Email:</p>*/
/*             <p class="row">{{ user.email }}</p>*/
/*             <p class="title">interesses:</p>*/
/*             <p class="row">{{ user.interesses }}</p>*/
/*             <p class="title">expertises:</p>*/
/*             <p class="row">{{ user.expertises }}</p>*/
/*             <p class="title">Status:</p>*/
/*             <p class="row">*/
/*                 {% if user.aanwezig == 1 %}*/
/*                     In het lab*/
/*                 {% elseif user.aanwezig is null or user.aanwezig is empty %}*/
/*                     nog niet in het lab geweest*/
/*                 {% elseif user.aanwezig == 0 %}*/
/*                     Niet aanwezig*/
/*                 {% endif %}*/
/*             </p>*/
/*         </div>*/
/*         {% if user.username == app.user.username %}<a href="{{ path('fos_user_profile_edit') }}">Bewerk gegevens</a>{% endif %}*/
/*     </div>*/
/*     <div class="side-content stats">*/
/*         <h2 class="h2">Stats</h2>*/
/*         <div id="response-message"></div>*/
/*         {% if user.aanwezig == 1 %}*/
/*             <a href="{{ path('checkin', {'username': user.username}) }}">Afmelden</a><br>*/
/*         {% elseif user.aanwezig == 0 %}*/
/*             <a href="{{ path('checkin', {'username': user.username}) }}">Aanmelden</a><br>*/
/*         {% endif %}*/
/*         <a href="#" class="opensaldoform userform">Saldo Wijzigen</a>*/
/*         <form class="user_transaction_form">*/
/*             <label>Gebruikersnaam: </label><input type="text" value="{{ user.username }}" disabled="disabled" />*/
/*             <label>Hoeveelheid: </label><input type="number">*/
/*             <input type="submit" value="Bij/Afschrijven" class="transactionbutton">*/
/*         </form>*/
/*         <hr>*/
/*         {% set sumratingsH = '0' %}*/
/*         {% set sumratingsi = '0' %}*/
/*         {% set sumratingss = '0' %}*/
/*         {% for session in ses %}*/
/*             {% if session.sessionduration %}*/
/*                 {% set sumratingsH = sumratingsH + session.sessionduration|date('H') / ses|length %}*/
/*                 {% set sumratingsi = sumratingsi + session.sessionduration|date('i') / ses|length %}*/
/*                 {% set sumratingss = sumratingss + session.sessionduration|date('s') / ses|length %}*/
/*             {% endif %}*/
/*         {% endfor %}*/
/*         {% set sumratingshl = (sumratingsH - sumratingsH|round(0, 'floor')) *60 %}*/
/*         {% set sumratingsi = sumratingsi + sumratingshl %}*/
/*         {%  if sumratingsi > 60 %}*/
/*             {% set sumratingsi = sumratingsi / 60 %}*/
/*             {% set sumratingsH = sumratingsH + sumratingsi|round(0, 'floor') %}*/
/*             {% set sumratingsi = (sumratingsi - sumratingsi|round(0, 'floor')) *60 %}*/
/*         {% endif %}*/
/*         {% set sumratingsil = (sumratingsi - sumratingsi|round(0, 'floor')) *60 %}*/
/*         {% set sumratingss = sumratingss + sumratingsil %}*/
/*         {%  if sumratingss > 60 %}*/
/*             {% set sumratingss = sumratingss / 60 %}*/
/*             {% set sumratingsi = sumratingsi + sumratingss|round(0, 'floor') %}*/
/*             {% set sumratingss = (sumratingss - sumratingss|round(0, 'floor')) *60 %}*/
/*         {% endif %}*/
/*         <p>Gemiddelde sessieduur: {{  sumratingsH|round(0, 'floor') }}:{{  "%02d"|format(sumratingsi|round(0, 'floor')) }}:{{  "%02d"|format(sumratingss|round)  }}</p>*/
/*         <p>Huidig saldo: <span id="{{ user.username }}">{{ user.saldo }}</span></p>*/
/* */
/*         {% if is_granted('ROLE_ADMIN') or user.username == app.user.username %}*/
/*             {% if ses %}*/
/*                 <h2 class="h2">Sessies</h2>*/
/*                 {% for sessions in ses %}*/
/*                     {% if sessions.timeout is null or sessions.timeout is empty %}*/
/*                         <p>Aanwezig sinds {% if sessions.timein|date('d-m-Y') == "now"|date('d-m-Y') %}vandaag{% else %}{{ sessions.timein|date('d-m-Y') }} om{% endif %} {{ sessions.timein|date('H:i') }}</p></br>*/
/*                     {% else %}*/
/*                         <p>In het lab geweest op {{sessions.timein|date('d-m-Y')}} voor {{ sessions.sessionduration|date('H:i:s') }}</p></br>*/
/*                     {% endif %}*/
/*                 {% endfor %}*/
/*             {% endif %}*/
/*         {% endif %}*/
/*     </div>*/
/* </div>*/
/* <script>*/
/* */
/*     $(document).ready(function(){*/
/*         $('.transactionbutton').on('click', function(event){*/
/*             event.preventDefault();*/
/*             var user = $(this).parent().find('input[type="text"]').val();*/
/*             var amount = $(this).parent().find('input[type="number"]').val();*/
/*             var parent = $('.side-content');*/
/*             acreateTransaction(user,amount,parent);*/
/*         });*/
/* */
/*     });*/
/* */
/*     function acreateTransaction(user, amount, parent){*/
/*         console.log(user, amount);*/
/*         $.post(*/
/*                 '{{path('DigitalArtLabBundle_ajax_create_transaction')}}',*/
/*                 {userdata: user, amountdata: amount},*/
/*                 function(response){*/
/*                     if(response.code == 100 && response.success){//dummy check*/
/*                         var count = $('#'+user).text();*/
/*                         $('#'+user).prop('Counter',count).animate({*/
/*                             Counter: response.newsaldo*/
/*                         }, {*/
/*                             duration: 500,*/
/*                             easing: 'swing',*/
/*                             step: function (now) {*/
/*                                 $(this).text(Math.ceil(now));*/
/*                             }*/
/*                         });*/
/*                         $(parent).find('.user_transaction_form').slideToggle().find('input[type="number"]').val(null);*/
/*                         $('#response-message').addClass('succes').removeClass('error').text('Transactie geslaagd! saldo van '+ user+ ' aangepast .' );*/
/*                     }*/
/*                     if(response.code == 200 || response.success == false){*/
/*                         $('#response-message').addClass('error').removeClass('succes').text('Transactie mislukt, gebruiker '+ user + ' Heeft niet genoeg saldo.');*/
/*                     }*/
/* */
/*                 }, "json");*/
/*     }*/
/* </script>*/
