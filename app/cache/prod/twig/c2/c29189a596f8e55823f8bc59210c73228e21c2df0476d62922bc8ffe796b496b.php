<?php

/* ::base.html.twig */
class __TwigTemplate_d8e9870d200afe70797cfa58aaab60a4ad5ed68720e9a5d646bf6101a2735f44 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'stylesheets' => array($this, 'block_stylesheets'),
            'javascripts' => array($this, 'block_javascripts'),
            'header' => array($this, 'block_header'),
            'body' => array($this, 'block_body'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<!DOCTYPE html>
<html>
    <head>
        <meta charset=\"UTF-8\" />
        <title>";
        // line 5
        $this->displayBlock('title', $context, $blocks);
        echo "</title>
        ";
        // line 6
        $this->displayBlock('stylesheets', $context, $blocks);
        // line 13
        echo "        <link rel=\"icon\" type=\"image/x-icon\" href=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('asset')->getAssetUrl("favicon.ico"), "html", null, true);
        echo "\" />
        ";
        // line 14
        $this->displayBlock('javascripts', $context, $blocks);
        // line 24
        echo "    </head>
    <body>
    <div class=\"menu\">
       <div class=\"container\">
           <div class=\"logo\"></div>
            <ul class=\"base-menu\">
                <li><a href=\"";
        // line 30
        echo $this->env->getExtension('routing')->getPath("homepage");
        echo "\" class=\"active\">Home</a></li>
                ";
        // line 31
        if ($this->env->getExtension('security')->isGranted("IS_AUTHENTICATED_REMEMBERED")) {
            // line 32
            echo "                    <li class=\"hasdrop\">
                        <a href=\"";
            // line 33
            echo $this->env->getExtension('routing')->getPath("fos_user_profile_show");
            echo "\">Mijn profiel</a>
                        <ul class=\"dropdown\">
                            ";
            // line 35
            if ($this->env->getExtension('security')->isGranted("ROLE_ADMIN")) {
                // line 36
                echo "                                <li><a href=\"";
                echo $this->env->getExtension('routing')->getPath("admin");
                echo "\">Administratie</a></li>
                            ";
            }
            // line 38
            echo "                            <li><a href=\"";
            echo $this->env->getExtension('routing')->getPath("fos_user_security_logout");
            echo "\">Uitloggen</a></li>
                        </ul>
                    </li>
                ";
        } else {
            // line 42
            echo "                    <li><a href=\"";
            echo $this->env->getExtension('routing')->getPath("fos_user_security_login");
            echo "\">Inloggen</a></li>
                ";
        }
        // line 44
        echo "
            </ul>
       </div>
    </div>
    <div class=\"clear\"></div>
    ";
        // line 49
        $this->displayBlock('header', $context, $blocks);
        // line 54
        echo "    <div class=\"clear\"></div>
    <div class=\"container body\">
        ";
        // line 56
        $this->displayBlock('body', $context, $blocks);
        // line 57
        echo "    </div>
    <div class=\"clear\"></div>
    </body>
</html>
";
    }

    // line 5
    public function block_title($context, array $blocks = array())
    {
        echo "Welcome!";
    }

    // line 6
    public function block_stylesheets($context, array $blocks = array())
    {
        // line 7
        echo "            ";
        if (isset($context['assetic']['debug']) && $context['assetic']['debug']) {
            // asset "50630ae_0"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_50630ae_0") : $this->env->getExtension('asset')->getAssetUrl("css/50630ae_custom_1.css");
            // line 10
            echo "            <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : null), "html", null, true);
            echo "\" />
            ";
        } else {
            // asset "50630ae"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_50630ae") : $this->env->getExtension('asset')->getAssetUrl("css/50630ae.css");
            echo "            <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : null), "html", null, true);
            echo "\" />
            ";
        }
        unset($context["asset_url"]);
        // line 12
        echo "        ";
    }

    // line 14
    public function block_javascripts($context, array $blocks = array())
    {
        // line 15
        echo "            ";
        if (isset($context['assetic']['debug']) && $context['assetic']['debug']) {
            // asset "ebf5381_0"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_ebf5381_0") : $this->env->getExtension('asset')->getAssetUrl("js/ebf5381_jquery_1.js");
            // line 21
            echo "            <script src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : null), "html", null, true);
            echo "\"></script>
            ";
            // asset "ebf5381_1"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_ebf5381_1") : $this->env->getExtension('asset')->getAssetUrl("js/ebf5381_jquery.qrcode_2.js");
            echo "            <script src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : null), "html", null, true);
            echo "\"></script>
            ";
            // asset "ebf5381_2"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_ebf5381_2") : $this->env->getExtension('asset')->getAssetUrl("js/ebf5381_jquery.canvasjs.min_3.js");
            echo "            <script src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : null), "html", null, true);
            echo "\"></script>
            ";
            // asset "ebf5381_3"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_ebf5381_3") : $this->env->getExtension('asset')->getAssetUrl("js/ebf5381_custom_4.js");
            echo "            <script src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : null), "html", null, true);
            echo "\"></script>
            ";
        } else {
            // asset "ebf5381"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_ebf5381") : $this->env->getExtension('asset')->getAssetUrl("js/ebf5381.js");
            echo "            <script src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : null), "html", null, true);
            echo "\"></script>
            ";
        }
        unset($context["asset_url"]);
        // line 23
        echo "        ";
    }

    // line 49
    public function block_header($context, array $blocks = array())
    {
        // line 50
        echo "        <div class=\"header header-1\">

        </div>
    ";
    }

    // line 56
    public function block_body($context, array $blocks = array())
    {
    }

    public function getTemplateName()
    {
        return "::base.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  196 => 56,  189 => 50,  186 => 49,  182 => 23,  150 => 21,  145 => 15,  142 => 14,  138 => 12,  124 => 10,  119 => 7,  116 => 6,  110 => 5,  102 => 57,  100 => 56,  96 => 54,  94 => 49,  87 => 44,  81 => 42,  73 => 38,  67 => 36,  65 => 35,  60 => 33,  57 => 32,  55 => 31,  51 => 30,  43 => 24,  41 => 14,  36 => 13,  34 => 6,  30 => 5,  24 => 1,);
    }
}
/* <!DOCTYPE html>*/
/* <html>*/
/*     <head>*/
/*         <meta charset="UTF-8" />*/
/*         <title>{% block title %}Welcome!{% endblock %}</title>*/
/*         {% block stylesheets %}*/
/*             {% stylesheets filter="cssrewrite"*/
/*             '@DigitalArtLabBundle/Resources/public/css/custom.css'*/
/*             %}*/
/*             <link rel="stylesheet" href="{{ asset_url }}" />*/
/*             {% endstylesheets %}*/
/*         {% endblock %}*/
/*         <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}" />*/
/*         {% block javascripts %}*/
/*             {% javascripts*/
/*             '%kernel.root_dir%/../vendor/components/jquery/jquery.js'*/
/*             '@DigitalArtLabBundle/Resources/public/js/jquery.qrcode.js'*/
/*             '@DigitalArtLabBundle/Resources/public/js/jquery.canvasjs.min.js'*/
/*             '@DigitalArtLabBundle/Resources/public/js/custom.js'*/
/*             %}*/
/*             <script src="{{ asset_url }}"></script>*/
/*             {% endjavascripts %}*/
/*         {% endblock %}*/
/*     </head>*/
/*     <body>*/
/*     <div class="menu">*/
/*        <div class="container">*/
/*            <div class="logo"></div>*/
/*             <ul class="base-menu">*/
/*                 <li><a href="{{ path('homepage') }}" class="active">Home</a></li>*/
/*                 {% if is_granted("IS_AUTHENTICATED_REMEMBERED") %}*/
/*                     <li class="hasdrop">*/
/*                         <a href="{{ path('fos_user_profile_show') }}">Mijn profiel</a>*/
/*                         <ul class="dropdown">*/
/*                             {% if is_granted('ROLE_ADMIN') %}*/
/*                                 <li><a href="{{ path('admin') }}">Administratie</a></li>*/
/*                             {% endif %}*/
/*                             <li><a href="{{ path('fos_user_security_logout') }}">Uitloggen</a></li>*/
/*                         </ul>*/
/*                     </li>*/
/*                 {% else %}*/
/*                     <li><a href="{{ path('fos_user_security_login') }}">Inloggen</a></li>*/
/*                 {% endif %}*/
/* */
/*             </ul>*/
/*        </div>*/
/*     </div>*/
/*     <div class="clear"></div>*/
/*     {% block header %}*/
/*         <div class="header header-1">*/
/* */
/*         </div>*/
/*     {% endblock %}*/
/*     <div class="clear"></div>*/
/*     <div class="container body">*/
/*         {% block body %}{% endblock %}*/
/*     </div>*/
/*     <div class="clear"></div>*/
/*     </body>*/
/* </html>*/
/* */
