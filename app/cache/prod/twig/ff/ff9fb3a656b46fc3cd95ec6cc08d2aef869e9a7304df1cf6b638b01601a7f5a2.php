<?php

/* FOSUserBundle:Profile:edit_content.html.twig */
class __TwigTemplate_872eee8ea4a6ddda7cf39f91177360edf290130b5336bb65388ef1d25f1ecd12 extends Twig_Template
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
        // line 2
        echo "<div class=\"register-container\">
    <h2 class=\"h2\">Profiel bewerken</h2>
    <form action=\"";
        // line 4
        echo $this->env->getExtension('routing')->getPath("fos_user_profile_edit");
        echo "\" ";
        echo $this->env->getExtension('form')->renderer->searchAndRenderBlock((isset($context["form"]) ? $context["form"] : null), 'enctype');
        echo " method=\"POST\" class=\"fos_user_profile_edit\">
        ";
        // line 5
        echo $this->env->getExtension('form')->renderer->searchAndRenderBlock((isset($context["form"]) ? $context["form"] : null), 'widget');
        echo "
        <div class=\"btn-fill\">
            <input type=\"submit\" value=\"Opslaan\" class=\"button\" /><a href=\"";
        // line 7
        echo $this->env->getExtension('routing')->getPath("fos_user_profile_show");
        echo "\">Terug naar profielpagina</a>
        </div>
    </form>
</div>";
    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Profile:edit_content.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  34 => 7,  29 => 5,  23 => 4,  19 => 2,);
    }
}
/* {% trans_default_domain 'FOSUserBundle' %}*/
/* <div class="register-container">*/
/*     <h2 class="h2">Profiel bewerken</h2>*/
/*     <form action="{{ path('fos_user_profile_edit') }}" {{ form_enctype(form) }} method="POST" class="fos_user_profile_edit">*/
/*         {{ form_widget(form) }}*/
/*         <div class="btn-fill">*/
/*             <input type="submit" value="Opslaan" class="button" /><a href="{{ path('fos_user_profile_show') }}">Terug naar profielpagina</a>*/
/*         </div>*/
/*     </form>*/
/* </div>*/
