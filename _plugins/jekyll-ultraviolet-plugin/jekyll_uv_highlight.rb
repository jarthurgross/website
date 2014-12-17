module Jekyll
  
  class UltravioletTag < Liquid::Block 
    require "Uv"
    # This defines an uvhighlight tag for code highlighting using Ultraviolet (must [sudo] gem install ultraviolet and dependancies)
    # Syntax for tag is {% uvhighlight code [theme] ["linenumb|linenos"]%} which is similar to the pygments call 
    # code is required, theme and linenumb optional and in any order
    def initialize(tag_name, arg, tokens)
      super
      copy_files? # copy css files if not in css directory
      options = arg.split
      numb_arg = options.length
      case numb_arg
      when 1
        @lang = options[0]
        @theme = "all_hallows_eve"
        @linenums = false
      when 2
        @lang = options[0]
        if options[1] =~ /(linenums|linenos)/ # uses either pygments keyword for display linenumber boolean or mine
          @linenums = true
          @theme = "all_hallows_eve"
        else
          @linenums = false
          @theme = options[1]
        end
      when 3
        @lang = options[0] 
        if options[1] =~ /(linenums|linenos)/ # in case you can't remember if theme is second or third!
          @linenums = true
          @theme = options[2]
        else
          @linenums = true
          @theme = options[1]
        end
      else
        raise SyntaxError.new("Syntax Error in 'uvhighlight' - Valid syntax: highlight <lang> [theme] [linenums|linenos]")
      end
      #check to see if good theme and code/syntax
      themes = Uv.themes
      syntaxes = Uv.syntaxes
      if themes.index(@theme).nil?
        raise SyntaxError.new("Theme Error in 'uvhighlight' - Valid themes: #{themes.inspect}")
      end
      if syntaxes.index(@lang).nil?
        raise SyntaxError.new("Languaage Error in 'uvhighlight' - Valid languages: #{syntaxes.inspect}")
      end
      # we're off to the rendering
    end

    def render(context)
      render_uv(context,super.join,@lang,@theme,@linenums)
      # don't know why I broke this out
    end
    
    def render_uv(context,code,lang,theme,linenum)
      output = Uv.parse( code.strip, "xhtml", lang, linenum, theme)
      # Probably not good html to add in-line css link, but it works! 
      output = "<div style=\"overflow:auto\">
      <link rel=\"stylesheet\" href=\"/css/uv/css/#{theme}.css\" type=\"text/css\" media=\"screen\" />
      #{output}</div>"
      # I was getting some strange stuff until I realized the below code sets a tag to not parse code with texttile
      output = context["pygments_prefix"] + output if context["pygments_prefix"]
      output = output + context["pygments_suffix"]  if context["pygments_suffix"]
      output
    end
    
    def copy_files?
      # copy files is checked at each call to uvhighlight. If I could have it to the config file (--ultraviolot)
      # it could add it at the beginning, but don't know how to do that so it is just a quick call
      # to see if there is a "uv" directory in the css directory.
      # if not there it copyies the css files from Ultraviolet. I assume there is a css directory
      uvcssdir = File.dirname(File.dirname(__FILE__))+"/css/uv" #go up to parent (from _plugin) and then down into css directory
      exists = File.exist?(uvcssdir)
      if !exists
        Dir.mkdir(uvcssdir)
        Uv.copy_files("xhtml",uvcssdir)
      end
    end
  end
  
end

Liquid::Template.register_tag('uvhighlight', Jekyll::UltravioletTag)
