<?php

/* DigitalArtLabBundle:checkin:print.html.twig */
class __TwigTemplate_82dc89126cb5d87d8fcac07da4a3244a0881875a674e75f7b5167df93a2fb263 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'stylesheets' => array($this, 'block_stylesheets'),
            'javascripts' => array($this, 'block_javascripts'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        $this->displayBlock('stylesheets', $context, $blocks);
        // line 8
        echo "<body>
<table>
    <tr>
        <td></td>
        <td>
            <div class=\"print_card\">
                <div class=\"qrcode\" value=\"";
        // line 14
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : null), "checkinurl", array()), "html", null, true);
        echo "\"></div>
                <div class=\"user\">
                    <h1>Gebruikersnaam:</h1>
                    <hr>
                    ";
        // line 18
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : null), "username", array()), "html", null, true);
        echo "
                    <h1 class=\"undertitle\">Volledige naam:</h1>
                    <hr>
                    ";
        // line 21
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : null), "firstname", array()), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : null), "lastname", array()), "html", null, true);
        echo "
                </div>
                <div class=\"underline\"><p class=\"url\">www.digitalartlab.nl</p><p class=\"date\">Datum: ";
        // line 23
        echo twig_escape_filter($this->env, twig_date_format_filter($this->env, "now", "d-m-Y"), "html", null, true);
        echo "</p></div>
            </div>
            <div class=\"print_card back\">

            </div>
        </td>
        <td></td>
    </tr>
</table>
    ";
        // line 32
        $this->displayBlock('javascripts', $context, $blocks);
        // line 41
        echo "</body>";
    }

    // line 1
    public function block_stylesheets($context, array $blocks = array())
    {
        // line 2
        echo "    ";
        if (isset($context['assetic']['debug']) && $context['assetic']['debug']) {
            // asset "30ba270_0"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_30ba270_0") : $this->env->getExtension('asset')->getAssetUrl("css/30ba270_print_1.css");
            // line 5
            echo "    <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : null), "html", null, true);
            echo "\"  media=\"print\" />
    ";
        } else {
            // asset "30ba270"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_30ba270") : $this->env->getExtension('asset')->getAssetUrl("css/30ba270.css");
            echo "    <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : null), "html", null, true);
            echo "\"  media=\"print\" />
    ";
        }
        unset($context["asset_url"]);
    }

    // line 32
    public function block_javascripts($context, array $blocks = array())
    {
        // line 33
        echo "        ";
        if (isset($context['assetic']['debug']) && $context['assetic']['debug']) {
            // asset "44a923e_0"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_44a923e_0") : $this->env->getExtension('asset')->getAssetUrl("js/44a923e_jquery_1.js");
            // line 38
            echo "        <script src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : null), "html", null, true);
            echo "\"></script>
        ";
            // asset "44a923e_1"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_44a923e_1") : $this->env->getExtension('asset')->getAssetUrl("js/44a923e_jquery.qrcode_2.js");
            echo "        <script src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : null), "html", null, true);
            echo "\"></script>
        ";
            // asset "44a923e_2"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_44a923e_2") : $this->env->getExtension('asset')->getAssetUrl("js/44a923e_custom_3.js");
            echo "        <script src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : null), "html", null, true);
            echo "\"></script>
        ";
        } else {
            // asset "44a923e"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_44a923e") : $this->env->getExtension('asset')->getAssetUrl("js/44a923e.js");
            echo "        <script src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : null), "html", null, true);
            echo "\"></script>
        ";
        }
        unset($context["asset_url"]);
        // line 40
        echo "    ";
    }

    public function getTemplateName()
    {
        return "DigitalArtLabBundle:checkin:print.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  127 => 40,  101 => 38,  96 => 33,  93 => 32,  77 => 5,  72 => 2,  69 => 1,  65 => 41,  63 => 32,  51 => 23,  44 => 21,  38 => 18,  31 => 14,  23 => 8,  21 => 1,);
    }
}
/* {% block stylesheets %}*/
/*     {% stylesheets filter="cssrewrite"*/
/*     '@DigitalArtLabBundle/Resources/public/css/print.css'*/
/*     %}*/
/*     <link rel="stylesheet" href="{{ asset_url }}"  media="print" />*/
/*     {% endstylesheets %}*/
/* {% endblock %}*/
/* <body>*/
/* <table>*/
/*     <tr>*/
/*         <td></td>*/
/*         <td>*/
/*             <div class="print_card">*/
/*                 <div class="qrcode" value="{{ user.checkinurl }}"></div>*/
/*                 <div class="user">*/
/*                     <h1>Gebruikersnaam:</h1>*/
/*                     <hr>*/
/*                     {{ user.username }}*/
/*                     <h1 class="undertitle">Volledige naam:</h1>*/
/*                     <hr>*/
/*                     {{ user.firstname }} {{ user.lastname }}*/
/*                 </div>*/
/*                 <div class="underline"><p class="url">www.digitalartlab.nl</p><p class="date">Datum: {{ "now"|date('d-m-Y') }}</p></div>*/
/*             </div>*/
/*             <div class="print_card back">*/
/* */
/*             </div>*/
/*         </td>*/
/*         <td></td>*/
/*     </tr>*/
/* </table>*/
/*     {% block javascripts %}*/
/*         {% javascripts*/
/*         '%kernel.root_dir%/../vendor/components/jquery/jquery.js'*/
/*         '@DigitalArtLabBundle/Resources/public/js/jquery.qrcode.js'*/
/*         '@DigitalArtLabBundle/Resources/public/js/custom.js'*/
/*         %}*/
/*         <script src="{{ asset_url }}"></script>*/
/*         {% endjavascripts %}*/
/*     {% endblock %}*/
/* </body>*/
