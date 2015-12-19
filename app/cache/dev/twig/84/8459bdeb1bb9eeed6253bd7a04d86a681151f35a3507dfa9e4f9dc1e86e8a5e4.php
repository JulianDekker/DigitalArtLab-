<?php

/* ::base.html.twig */
class __TwigTemplate_444bb9949451eaa86c779ff3e5770e7ca634b2423a08c6b6d8354c78b0c72778 extends Twig_Template
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
        $__internal_76ab3c3c87bf6c9f92ae6803e4d7fdebbcef5be8fd46f78e5def86e6913d2844 = $this->env->getExtension("native_profiler");
        $__internal_76ab3c3c87bf6c9f92ae6803e4d7fdebbcef5be8fd46f78e5def86e6913d2844->enter($__internal_76ab3c3c87bf6c9f92ae6803e4d7fdebbcef5be8fd46f78e5def86e6913d2844_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "::base.html.twig"));

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
        
        $__internal_76ab3c3c87bf6c9f92ae6803e4d7fdebbcef5be8fd46f78e5def86e6913d2844->leave($__internal_76ab3c3c87bf6c9f92ae6803e4d7fdebbcef5be8fd46f78e5def86e6913d2844_prof);

    }

    // line 5
    public function block_title($context, array $blocks = array())
    {
        $__internal_91d7b4ed744f606949f43cffe5b4930bfd1b0517936357c176b1c81e4b1f9d0f = $this->env->getExtension("native_profiler");
        $__internal_91d7b4ed744f606949f43cffe5b4930bfd1b0517936357c176b1c81e4b1f9d0f->enter($__internal_91d7b4ed744f606949f43cffe5b4930bfd1b0517936357c176b1c81e4b1f9d0f_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "title"));

        echo "Welcome!";
        
        $__internal_91d7b4ed744f606949f43cffe5b4930bfd1b0517936357c176b1c81e4b1f9d0f->leave($__internal_91d7b4ed744f606949f43cffe5b4930bfd1b0517936357c176b1c81e4b1f9d0f_prof);

    }

    // line 6
    public function block_stylesheets($context, array $blocks = array())
    {
        $__internal_ded32664d03e86aa14330be3b6d1a5052d0e18f1e83a2b90db3a7777051d586f = $this->env->getExtension("native_profiler");
        $__internal_ded32664d03e86aa14330be3b6d1a5052d0e18f1e83a2b90db3a7777051d586f->enter($__internal_ded32664d03e86aa14330be3b6d1a5052d0e18f1e83a2b90db3a7777051d586f_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "stylesheets"));

        // line 7
        echo "            ";
        if (isset($context['assetic']['debug']) && $context['assetic']['debug']) {
            // asset "50630ae_0"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_50630ae_0") : $this->env->getExtension('asset')->getAssetUrl("_controller/css/50630ae_custom_1.css");
            // line 10
            echo "            <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
            ";
        } else {
            // asset "50630ae"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_50630ae") : $this->env->getExtension('asset')->getAssetUrl("_controller/css/50630ae.css");
            echo "            <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
            ";
        }
        unset($context["asset_url"]);
        // line 12
        echo "        ";
        
        $__internal_ded32664d03e86aa14330be3b6d1a5052d0e18f1e83a2b90db3a7777051d586f->leave($__internal_ded32664d03e86aa14330be3b6d1a5052d0e18f1e83a2b90db3a7777051d586f_prof);

    }

    // line 14
    public function block_javascripts($context, array $blocks = array())
    {
        $__internal_f2edca0ad992eea7c609bb38bcd19a63d8a84e9336b011f3f3b83e1c20b8898c = $this->env->getExtension("native_profiler");
        $__internal_f2edca0ad992eea7c609bb38bcd19a63d8a84e9336b011f3f3b83e1c20b8898c->enter($__internal_f2edca0ad992eea7c609bb38bcd19a63d8a84e9336b011f3f3b83e1c20b8898c_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "javascripts"));

        // line 15
        echo "            ";
        if (isset($context['assetic']['debug']) && $context['assetic']['debug']) {
            // asset "ebf5381_0"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_ebf5381_0") : $this->env->getExtension('asset')->getAssetUrl("_controller/js/ebf5381_jquery_1.js");
            // line 21
            echo "            <script src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
            ";
            // asset "ebf5381_1"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_ebf5381_1") : $this->env->getExtension('asset')->getAssetUrl("_controller/js/ebf5381_jquery.qrcode_2.js");
            echo "            <script src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
            ";
            // asset "ebf5381_2"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_ebf5381_2") : $this->env->getExtension('asset')->getAssetUrl("_controller/js/ebf5381_jquery.canvasjs.min_3.js");
            echo "            <script src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
            ";
            // asset "ebf5381_3"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_ebf5381_3") : $this->env->getExtension('asset')->getAssetUrl("_controller/js/ebf5381_custom_4.js");
            echo "            <script src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
            ";
        } else {
            // asset "ebf5381"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_ebf5381") : $this->env->getExtension('asset')->getAssetUrl("_controller/js/ebf5381.js");
            echo "            <script src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
            ";
        }
        unset($context["asset_url"]);
        // line 23
        echo "        ";
        
        $__internal_f2edca0ad992eea7c609bb38bcd19a63d8a84e9336b011f3f3b83e1c20b8898c->leave($__internal_f2edca0ad992eea7c609bb38bcd19a63d8a84e9336b011f3f3b83e1c20b8898c_prof);

    }

    // line 49
    public function block_header($context, array $blocks = array())
    {
        $__internal_76903c9d01aff2aca266c7807feca95bc20ac8994f22003a2658eeaf43ac5e41 = $this->env->getExtension("native_profiler");
        $__internal_76903c9d01aff2aca266c7807feca95bc20ac8994f22003a2658eeaf43ac5e41->enter($__internal_76903c9d01aff2aca266c7807feca95bc20ac8994f22003a2658eeaf43ac5e41_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "header"));

        // line 50
        echo "        <div class=\"header header-1\">

        </div>
    ";
        
        $__internal_76903c9d01aff2aca266c7807feca95bc20ac8994f22003a2658eeaf43ac5e41->leave($__internal_76903c9d01aff2aca266c7807feca95bc20ac8994f22003a2658eeaf43ac5e41_prof);

    }

    // line 56
    public function block_body($context, array $blocks = array())
    {
        $__internal_9221c2e3047e3f42ddb7bd4021fc289f440a2015300c1948aa87a8ece5f46501 = $this->env->getExtension("native_profiler");
        $__internal_9221c2e3047e3f42ddb7bd4021fc289f440a2015300c1948aa87a8ece5f46501->enter($__internal_9221c2e3047e3f42ddb7bd4021fc289f440a2015300c1948aa87a8ece5f46501_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        
        $__internal_9221c2e3047e3f42ddb7bd4021fc289f440a2015300c1948aa87a8ece5f46501->leave($__internal_9221c2e3047e3f42ddb7bd4021fc289f440a2015300c1948aa87a8ece5f46501_prof);

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
        return array (  226 => 56,  216 => 50,  210 => 49,  203 => 23,  171 => 21,  166 => 15,  160 => 14,  153 => 12,  139 => 10,  134 => 7,  128 => 6,  116 => 5,  105 => 57,  103 => 56,  99 => 54,  97 => 49,  90 => 44,  84 => 42,  76 => 38,  70 => 36,  68 => 35,  63 => 33,  60 => 32,  58 => 31,  54 => 30,  46 => 24,  44 => 14,  39 => 13,  37 => 6,  33 => 5,  27 => 1,);
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
