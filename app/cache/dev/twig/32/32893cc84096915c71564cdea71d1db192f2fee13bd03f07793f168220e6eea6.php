<?php

/* TwigBundle:Exception:exception_full.html.twig */
class __TwigTemplate_8727609472fa71fc4d0bd1cc4ae7e611fcd1f617caf4eac1298e640bdc4d7a8f extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("TwigBundle::layout.html.twig", "TwigBundle:Exception:exception_full.html.twig", 1);
        $this->blocks = array(
            'head' => array($this, 'block_head'),
            'title' => array($this, 'block_title'),
            'body' => array($this, 'block_body'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "TwigBundle::layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_f63215e5f9cdab3d495a2faba5200d37606d1ebd4b654c3062bba29fe434afcf = $this->env->getExtension("native_profiler");
        $__internal_f63215e5f9cdab3d495a2faba5200d37606d1ebd4b654c3062bba29fe434afcf->enter($__internal_f63215e5f9cdab3d495a2faba5200d37606d1ebd4b654c3062bba29fe434afcf_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:exception_full.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_f63215e5f9cdab3d495a2faba5200d37606d1ebd4b654c3062bba29fe434afcf->leave($__internal_f63215e5f9cdab3d495a2faba5200d37606d1ebd4b654c3062bba29fe434afcf_prof);

    }

    // line 3
    public function block_head($context, array $blocks = array())
    {
        $__internal_050c1510d4aa549c44cc3bde741cfae4e8a80a2d9fc0f5f870d27b56ed425df0 = $this->env->getExtension("native_profiler");
        $__internal_050c1510d4aa549c44cc3bde741cfae4e8a80a2d9fc0f5f870d27b56ed425df0->enter($__internal_050c1510d4aa549c44cc3bde741cfae4e8a80a2d9fc0f5f870d27b56ed425df0_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "head"));

        // line 4
        echo "    <link href=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('request')->generateAbsoluteUrl($this->env->getExtension('asset')->getAssetUrl("bundles/framework/css/exception.css")), "html", null, true);
        echo "\" rel=\"stylesheet\" type=\"text/css\" media=\"all\" />
";
        
        $__internal_050c1510d4aa549c44cc3bde741cfae4e8a80a2d9fc0f5f870d27b56ed425df0->leave($__internal_050c1510d4aa549c44cc3bde741cfae4e8a80a2d9fc0f5f870d27b56ed425df0_prof);

    }

    // line 7
    public function block_title($context, array $blocks = array())
    {
        $__internal_bcfd15d7d6ce57c5e66887471300d72d2f5f22b1ef7cec68a761f649e5bddb5a = $this->env->getExtension("native_profiler");
        $__internal_bcfd15d7d6ce57c5e66887471300d72d2f5f22b1ef7cec68a761f649e5bddb5a->enter($__internal_bcfd15d7d6ce57c5e66887471300d72d2f5f22b1ef7cec68a761f649e5bddb5a_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "title"));

        // line 8
        echo "    ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["exception"]) ? $context["exception"] : $this->getContext($context, "exception")), "message", array()), "html", null, true);
        echo " (";
        echo twig_escape_filter($this->env, (isset($context["status_code"]) ? $context["status_code"] : $this->getContext($context, "status_code")), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, (isset($context["status_text"]) ? $context["status_text"] : $this->getContext($context, "status_text")), "html", null, true);
        echo ")
";
        
        $__internal_bcfd15d7d6ce57c5e66887471300d72d2f5f22b1ef7cec68a761f649e5bddb5a->leave($__internal_bcfd15d7d6ce57c5e66887471300d72d2f5f22b1ef7cec68a761f649e5bddb5a_prof);

    }

    // line 11
    public function block_body($context, array $blocks = array())
    {
        $__internal_102ff8432fb7a207ef27bc0aefe3f1af1770f5283036bb43f0ce8a9ecec5c10b = $this->env->getExtension("native_profiler");
        $__internal_102ff8432fb7a207ef27bc0aefe3f1af1770f5283036bb43f0ce8a9ecec5c10b->enter($__internal_102ff8432fb7a207ef27bc0aefe3f1af1770f5283036bb43f0ce8a9ecec5c10b_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        // line 12
        echo "    ";
        $this->loadTemplate("TwigBundle:Exception:exception.html.twig", "TwigBundle:Exception:exception_full.html.twig", 12)->display($context);
        
        $__internal_102ff8432fb7a207ef27bc0aefe3f1af1770f5283036bb43f0ce8a9ecec5c10b->leave($__internal_102ff8432fb7a207ef27bc0aefe3f1af1770f5283036bb43f0ce8a9ecec5c10b_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:exception_full.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  78 => 12,  72 => 11,  58 => 8,  52 => 7,  42 => 4,  36 => 3,  11 => 1,);
    }
}
/* {% extends 'TwigBundle::layout.html.twig' %}*/
/* */
/* {% block head %}*/
/*     <link href="{{ absolute_url(asset('bundles/framework/css/exception.css')) }}" rel="stylesheet" type="text/css" media="all" />*/
/* {% endblock %}*/
/* */
/* {% block title %}*/
/*     {{ exception.message }} ({{ status_code }} {{ status_text }})*/
/* {% endblock %}*/
/* */
/* {% block body %}*/
/*     {% include 'TwigBundle:Exception:exception.html.twig' %}*/
/* {% endblock %}*/
/* */
