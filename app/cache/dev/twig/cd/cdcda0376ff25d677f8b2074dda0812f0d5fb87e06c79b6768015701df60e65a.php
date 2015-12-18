<?php

/* TwigBundle:Exception:traces.txt.twig */
class __TwigTemplate_c2b59292c6df8d84a6e8c5fab1594ce04ce65f1ed383aeb222a39386cfb8180b extends Twig_Template
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
        $__internal_575f7d379c4a44c00797ebe235be246bef3434af3ff1bd88c5dd22cfbe4ac2b9 = $this->env->getExtension("native_profiler");
        $__internal_575f7d379c4a44c00797ebe235be246bef3434af3ff1bd88c5dd22cfbe4ac2b9->enter($__internal_575f7d379c4a44c00797ebe235be246bef3434af3ff1bd88c5dd22cfbe4ac2b9_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:traces.txt.twig"));

        // line 1
        if (twig_length_filter($this->env, $this->getAttribute((isset($context["exception"]) ? $context["exception"] : $this->getContext($context, "exception")), "trace", array()))) {
            // line 2
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute((isset($context["exception"]) ? $context["exception"] : $this->getContext($context, "exception")), "trace", array()));
            foreach ($context['_seq'] as $context["_key"] => $context["trace"]) {
                // line 3
                $this->loadTemplate("TwigBundle:Exception:trace.txt.twig", "TwigBundle:Exception:traces.txt.twig", 3)->display(array("trace" => $context["trace"]));
                // line 4
                echo "
";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['trace'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
        }
        
        $__internal_575f7d379c4a44c00797ebe235be246bef3434af3ff1bd88c5dd22cfbe4ac2b9->leave($__internal_575f7d379c4a44c00797ebe235be246bef3434af3ff1bd88c5dd22cfbe4ac2b9_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:traces.txt.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  30 => 4,  28 => 3,  24 => 2,  22 => 1,);
    }
}
/* {% if exception.trace|length %}*/
/* {% for trace in exception.trace %}*/
/* {% include 'TwigBundle:Exception:trace.txt.twig' with { 'trace': trace } only %}*/
/* */
/* {% endfor %}*/
/* {% endif %}*/
/* */
