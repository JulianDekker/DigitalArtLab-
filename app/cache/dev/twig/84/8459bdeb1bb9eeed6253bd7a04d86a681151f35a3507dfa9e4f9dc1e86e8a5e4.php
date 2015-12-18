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
        $__internal_5e39dc9cee8dd66cc0ef16b64d3d706516a598f10d9a051bcf6b321b0261c022 = $this->env->getExtension("native_profiler");
        $__internal_5e39dc9cee8dd66cc0ef16b64d3d706516a598f10d9a051bcf6b321b0261c022->enter($__internal_5e39dc9cee8dd66cc0ef16b64d3d706516a598f10d9a051bcf6b321b0261c022_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "::base.html.twig"));

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
        
        $__internal_5e39dc9cee8dd66cc0ef16b64d3d706516a598f10d9a051bcf6b321b0261c022->leave($__internal_5e39dc9cee8dd66cc0ef16b64d3d706516a598f10d9a051bcf6b321b0261c022_prof);

    }

    // line 5
    public function block_title($context, array $blocks = array())
    {
        $__internal_bd204394ed14f2401b41163bad8697079d5e1a9f4ce79f2c45c9ca40edd39a0c = $this->env->getExtension("native_profiler");
        $__internal_bd204394ed14f2401b41163bad8697079d5e1a9f4ce79f2c45c9ca40edd39a0c->enter($__internal_bd204394ed14f2401b41163bad8697079d5e1a9f4ce79f2c45c9ca40edd39a0c_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "title"));

        echo "Welcome!";
        
        $__internal_bd204394ed14f2401b41163bad8697079d5e1a9f4ce79f2c45c9ca40edd39a0c->leave($__internal_bd204394ed14f2401b41163bad8697079d5e1a9f4ce79f2c45c9ca40edd39a0c_prof);

    }

    // line 6
    public function block_stylesheets($context, array $blocks = array())
    {
        $__internal_d7986457bdaaa0a186346da513118396afc7e7557358d221566fd7fd315f970f = $this->env->getExtension("native_profiler");
        $__internal_d7986457bdaaa0a186346da513118396afc7e7557358d221566fd7fd315f970f->enter($__internal_d7986457bdaaa0a186346da513118396afc7e7557358d221566fd7fd315f970f_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "stylesheets"));

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
        
        $__internal_d7986457bdaaa0a186346da513118396afc7e7557358d221566fd7fd315f970f->leave($__internal_d7986457bdaaa0a186346da513118396afc7e7557358d221566fd7fd315f970f_prof);

    }

    // line 14
    public function block_javascripts($context, array $blocks = array())
    {
        $__internal_3d6b347104b66d0d319b93a962faa67c209820292690838b60f7f49e9085ba28 = $this->env->getExtension("native_profiler");
        $__internal_3d6b347104b66d0d319b93a962faa67c209820292690838b60f7f49e9085ba28->enter($__internal_3d6b347104b66d0d319b93a962faa67c209820292690838b60f7f49e9085ba28_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "javascripts"));

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
        
        $__internal_3d6b347104b66d0d319b93a962faa67c209820292690838b60f7f49e9085ba28->leave($__internal_3d6b347104b66d0d319b93a962faa67c209820292690838b60f7f49e9085ba28_prof);

    }

    // line 49
    public function block_header($context, array $blocks = array())
    {
        $__internal_f0a3db5e375e17a1a99d6f9b9398081b29bbcc1569e1857dc348ea198affe4b8 = $this->env->getExtension("native_profiler");
        $__internal_f0a3db5e375e17a1a99d6f9b9398081b29bbcc1569e1857dc348ea198affe4b8->enter($__internal_f0a3db5e375e17a1a99d6f9b9398081b29bbcc1569e1857dc348ea198affe4b8_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "header"));

        // line 50
        echo "        <div class=\"header header-1\">

        </div>
    ";
        
        $__internal_f0a3db5e375e17a1a99d6f9b9398081b29bbcc1569e1857dc348ea198affe4b8->leave($__internal_f0a3db5e375e17a1a99d6f9b9398081b29bbcc1569e1857dc348ea198affe4b8_prof);

    }

    // line 56
    public function block_body($context, array $blocks = array())
    {
        $__internal_7f10760086ba3091a9c3d3ca34402f9aa6cf6f6051a1c78910aa949c45cf7b1c = $this->env->getExtension("native_profiler");
        $__internal_7f10760086ba3091a9c3d3ca34402f9aa6cf6f6051a1c78910aa949c45cf7b1c->enter($__internal_7f10760086ba3091a9c3d3ca34402f9aa6cf6f6051a1c78910aa949c45cf7b1c_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        
        $__internal_7f10760086ba3091a9c3d3ca34402f9aa6cf6f6051a1c78910aa949c45cf7b1c->leave($__internal_7f10760086ba3091a9c3d3ca34402f9aa6cf6f6051a1c78910aa949c45cf7b1c_prof);

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
