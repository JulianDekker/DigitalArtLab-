<?php

/* FOSUserBundle:Security:login.html.twig */
class __TwigTemplate_91b91ea4cea195465d771533cbb14d72cd568f6aaf278213cec3a764dbcfda37 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("FOSUserBundle::layout.html.twig", "FOSUserBundle:Security:login.html.twig", 1);
        $this->blocks = array(
            'fos_user_content' => array($this, 'block_fos_user_content'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "FOSUserBundle::layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 5
    public function block_fos_user_content($context, array $blocks = array())
    {
        // line 6
        echo "
<div class=\"login-container\">
    <h2 class=\"h2\">Inloggen bij het lab</h2>
    ";
        // line 9
        if ((isset($context["error"]) ? $context["error"] : null)) {
            // line 10
            echo "    <div class=\"error\">Onjuiste gebruikersnaam of wachtwoord.</div>
    ";
        }
        // line 12
        echo "    <form action=\"";
        echo $this->env->getExtension('routing')->getPath("fos_user_security_check");
        echo "\" method=\"post\">
        <input type=\"hidden\" name=\"_csrf_token\" value=\"";
        // line 13
        echo twig_escape_filter($this->env, (isset($context["csrf_token"]) ? $context["csrf_token"] : null), "html", null, true);
        echo "\" />

        <label class=\"label100\" for=\"username\">Gebruikersnaam</label>
        <input class=\"input100\" type=\"text\" id=\"username\" name=\"_username\" value=\"";
        // line 16
        echo twig_escape_filter($this->env, (isset($context["last_username"]) ? $context["last_username"] : null), "html", null, true);
        echo "\" required=\"required\" />
        <div class=\"clear\"></div>
        <label class=\"label100\" for=\"password\">Wachtwoord</label>
        <input class=\"input100\" type=\"password\" id=\"password\" name=\"_password\" required=\"required\" />
        <div class=\"clear\"></div>
        <div class=\"group-100\">
            <input type=\"checkbox\" id=\"remember_me\" name=\"_remember_me\" value=\"on\" />
            <label for=\"remember_me\">Onthoud mij</label>
        </div>
        <div class=\"clear\"></div>
        <div class=\"btn-fill\">
            <input type=\"submit\" id=\"_submit\" name=\"_submit\" value=\"inloggen\" class=\"button\" />
            <a href=\"";
        // line 28
        echo $this->env->getExtension('routing')->getPath("fos_user_registration_register");
        echo "\">Account aanmaken</a>
        </div>
        <div class=\"clear\"></div>
    </form>
</div>
";
    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Security:login.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  68 => 28,  53 => 16,  47 => 13,  42 => 12,  38 => 10,  36 => 9,  31 => 6,  28 => 5,  11 => 1,);
    }
}
/* {% extends "FOSUserBundle::layout.html.twig" %}*/
/* */
/* {% trans_default_domain 'FOSUserBundle' %}*/
/* */
/* {% block fos_user_content %}*/
/* */
/* <div class="login-container">*/
/*     <h2 class="h2">Inloggen bij het lab</h2>*/
/*     {% if error %}*/
/*     <div class="error">Onjuiste gebruikersnaam of wachtwoord.</div>*/
/*     {% endif %}*/
/*     <form action="{{ path("fos_user_security_check") }}" method="post">*/
/*         <input type="hidden" name="_csrf_token" value="{{ csrf_token }}" />*/
/* */
/*         <label class="label100" for="username">Gebruikersnaam</label>*/
/*         <input class="input100" type="text" id="username" name="_username" value="{{ last_username }}" required="required" />*/
/*         <div class="clear"></div>*/
/*         <label class="label100" for="password">Wachtwoord</label>*/
/*         <input class="input100" type="password" id="password" name="_password" required="required" />*/
/*         <div class="clear"></div>*/
/*         <div class="group-100">*/
/*             <input type="checkbox" id="remember_me" name="_remember_me" value="on" />*/
/*             <label for="remember_me">Onthoud mij</label>*/
/*         </div>*/
/*         <div class="clear"></div>*/
/*         <div class="btn-fill">*/
/*             <input type="submit" id="_submit" name="_submit" value="inloggen" class="button" />*/
/*             <a href="{{ path('fos_user_registration_register') }}">Account aanmaken</a>*/
/*         </div>*/
/*         <div class="clear"></div>*/
/*     </form>*/
/* </div>*/
/* {% endblock fos_user_content %}*/
/* */
