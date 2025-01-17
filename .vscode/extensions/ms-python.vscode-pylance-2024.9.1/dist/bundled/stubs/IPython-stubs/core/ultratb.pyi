"""
This type stub file was generated by pyright.
"""

import functools
import types
import IPython.utils.colorable as colorable
from types import TracebackType
from typing import Any, List, Optional, Tuple

"""
Verbose and colourful traceback formatting.

**ColorTB**

I've always found it a bit hard to visually parse tracebacks in Python.  The
ColorTB class is a solution to that problem.  It colors the different parts of a
traceback in a manner similar to what you would expect from a syntax-highlighting
text editor.

Installation instructions for ColorTB::

    import sys,ultratb
    sys.excepthook = ultratb.ColorTB()

**VerboseTB**

I've also included a port of Ka-Ping Yee's "cgitb.py" that produces all kinds
of useful info when a traceback occurs.  Ping originally had it spit out HTML
and intended it for CGI programmers, but why should they have all the fun?  I
altered it to spit out colored text to the terminal.  It's a bit overwhelming,
but kind of neat, and maybe useful for long-running programs that you believe
are bug-free.  If a crash *does* occur in that type of program you want details.
Give it a shot--you'll love it or you'll hate it.

.. note::

  The Verbose mode prints the variables currently visible where the exception
  happened (shortening their strings if too long). This can potentially be
  very slow, if you happen to have a huge data structure whose string
  representation is complex to compute. Your computer may appear to freeze for
  a while with cpu usage at 100%. If this occurs, you can cancel the traceback
  with Ctrl-C (maybe hitting it more than once).

  If you encounter this kind of situation often, you may want to use the
  Verbose_novars mode instead of the regular Verbose, which avoids formatting
  variables (but otherwise includes the information and context given by
  Verbose).

.. note::

  The verbose mode print all variables in the stack, which means it can
  potentially leak sensitive information like access keys, or unencrypted
  password.

Installation instructions for VerboseTB::

    import sys,ultratb
    sys.excepthook = ultratb.VerboseTB()

Note:  Much of the code in this module was lifted verbatim from the standard
library module 'traceback.py' and Ka-Ping Yee's 'cgitb.py'.

Color schemes
-------------

The colors are defined in the class TBTools through the use of the
ColorSchemeTable class. Currently the following exist:

  - NoColor: allows all of this module to be used in any terminal (the color
    escapes are just dummy blank strings).

  - Linux: is meant to look good in a terminal like the Linux console (black
    or very dark background).

  - LightBG: similar to Linux but swaps dark/light colors to be more readable
    in light background terminals.

  - Neutral: a neutral color scheme that should be readable on both light and
    dark background

You can implement other color schemes easily, the syntax is fairly
self-explanatory. Please send back new schemes you develop to the author for
possible inclusion in future releases.

Inheritance diagram:

.. inheritance-diagram:: IPython.core.ultratb
   :parts: 3
"""
INDENT_SIZE = ...
DEFAULT_SCHEME = ...
FAST_THRESHOLD = ...
@functools.lru_cache()
def count_lines_in_py_file(filename: str) -> int:
    """
    Given a filename, returns the number of lines in the file
    if it ends with the extension ".py". Otherwise, returns 0.
    """
    ...

def get_line_number_of_frame(frame: types.FrameType) -> int:
    """
    Given a frame object, returns the total number of lines in the file
    containing the frame's code object, or the number of lines in the
    frame's source code if the file is not available.

    Parameters
    ----------
    frame : FrameType
        The frame object whose line number is to be determined.

    Returns
    -------
    int
        The total number of lines in the file containing the frame's
        code object, or the number of lines in the frame's source code
        if the file is not available.
    """
    ...

class TBTools(colorable.Colorable):
    """Basic tools used by all traceback printer classes."""
    tb_offset = ...
    def __init__(self, color_scheme=..., call_pdb=..., ostream=..., parent=..., config=..., *, debugger_cls=...) -> None:
        ...
    
    ostream = ...
    def get_parts_of_chained_exception(self, evalue) -> Optional[Tuple[type, BaseException, TracebackType]]:
        ...
    
    def prepare_chained_exception_message(self, cause) -> List[Any]:
        ...
    
    @property
    def has_colors(self) -> bool:
        ...
    
    def set_colors(self, *args, **kw): # -> None:
        """Shorthand access to the color table scheme selector method."""
        ...
    
    def color_toggle(self): # -> None:
        """Toggle between the currently active color scheme and NoColor."""
        ...
    
    def stb2text(self, stb):
        """Convert a structured traceback (a list) to a string."""
        ...
    
    def text(self, etype, value, tb, tb_offset: Optional[int] = ..., context=...):
        """Return formatted traceback.

        Subclasses may override this if they add extra arguments.
        """
        ...
    
    def structured_traceback(self, etype: type, evalue: Optional[BaseException], etb: Optional[TracebackType] = ..., tb_offset: Optional[int] = ..., number_of_lines_of_context: int = ...):
        """Return a list of traceback frames.

        Must be implemented by each class.
        """
        ...
    


class ListTB(TBTools):
    """Print traceback information from a traceback list, with optional color.

    Calling requires 3 arguments: (etype, evalue, elist)
    as would be obtained by::

      etype, evalue, tb = sys.exc_info()
      if tb:
        elist = traceback.extract_tb(tb)
      else:
        elist = None

    It can thus be used by programs which need to process the traceback before
    printing (such as console replacements based on the code module from the
    standard library).

    Because they are meant to be called without a full traceback (only a
    list), instances of this class can't call the interactive pdb debugger."""
    def __call__(self, etype, value, elist): # -> None:
        ...
    
    def structured_traceback(self, etype: type, evalue: Optional[BaseException], etb: Optional[TracebackType] = ..., tb_offset: Optional[int] = ..., context=...):
        """Return a color formatted string with the traceback info.

        Parameters
        ----------
        etype : exception type
            Type of the exception raised.
        evalue : object
            Data stored in the exception
        etb : list | TracebackType | None
            If list: List of frames, see class docstring for details.
            If Traceback: Traceback of the exception.
        tb_offset : int, optional
            Number of frames in the traceback to skip.  If not given, the
            instance evalue is used (set in constructor).
        context : int, optional
            Number of lines of context information to print.

        Returns
        -------
        String with formatted exception.
        """
        ...
    
    def get_exception_only(self, etype, value):
        """Only print the exception type and message, without a traceback.

        Parameters
        ----------
        etype : exception type
        value : exception value
        """
        ...
    
    def show_exception_only(self, etype, evalue): # -> None:
        """Only print the exception type and message, without a traceback.

        Parameters
        ----------
        etype : exception type
        evalue : exception value
        """
        ...
    


class FrameInfo:
    """
    Mirror of stack data's FrameInfo, but so that we can bypass highlighting on
    really long frames.
    """
    description: Optional[str]
    filename: Optional[str]
    lineno: Tuple[int]
    context: Optional[int]
    def __init__(self, description: Optional[str], filename: str, lineno: Tuple[int], frame, code, *, sd=..., context=...) -> None:
        ...
    
    @property
    def variables_in_executing_piece(self):
        ...
    
    @property
    def lines(self):
        ...
    
    @property
    def executing(self): # -> None:
        ...
    


class VerboseTB(TBTools):
    """A port of Ka-Ping Yee's cgitb.py module that outputs color text instead
    of HTML.  Requires inspect and pydoc.  Crazy, man.

    Modified version which optionally strips the topmost entries from the
    traceback, to be used with alternate interpreters (because their own code
    would appear in the traceback)."""
    _tb_highlight = ...
    def __init__(self, color_scheme: str = ..., call_pdb: bool = ..., ostream=..., tb_offset: int = ..., long_header: bool = ..., include_vars: bool = ..., check_cache=..., debugger_cls=..., parent=..., config=...) -> None:
        """Specify traceback offset, headers and color scheme.

        Define how many frames to drop from the tracebacks. Calling it with
        tb_offset=1 allows use of this handler in interpreters which will have
        their own code at the top of the traceback (VerboseTB will first
        remove that frame before printing the traceback info)."""
        ...
    
    def format_record(self, frame_info: FrameInfo):
        """Format a single stack frame"""
        ...
    
    def prepare_header(self, etype: str, long_version: bool = ...):
        ...
    
    def format_exception(self, etype, evalue):
        ...
    
    def format_exception_as_a_whole(self, etype: type, evalue: Optional[BaseException], etb: Optional[TracebackType], number_of_lines_of_context, tb_offset: Optional[int]):
        """Formats the header, traceback and exception message for a single exception.

        This may be called multiple times by Python 3 exception chaining
        (PEP 3134).
        """
        ...
    
    def get_records(self, etb: TracebackType, number_of_lines_of_context: int, tb_offset: int):
        ...
    
    def structured_traceback(self, etype: type, evalue: Optional[BaseException], etb: Optional[TracebackType] = ..., tb_offset: Optional[int] = ..., number_of_lines_of_context: int = ...):
        """Return a nice text document describing the traceback."""
        ...
    
    def debugger(self, force: bool = ...): # -> None:
        """Call up the pdb debugger if desired, always clean up the tb
        reference.

        Keywords:

          - force(False): by default, this routine checks the instance call_pdb
            flag and does not actually invoke the debugger if the flag is false.
            The 'force' option forces the debugger to activate even if the flag
            is false.

        If the call_pdb flag is set, the pdb interactive debugger is
        invoked. In all cases, the self.tb reference to the current traceback
        is deleted to prevent lingering references which hamper memory
        management.

        Note that each call to pdb() does an 'import readline', so if your app
        requires a special setup for the readline completers, you'll have to
        fix that by hand after invoking the exception handler."""
        ...
    
    def handler(self, info=...): # -> None:
        ...
    
    def __call__(self, etype=..., evalue=..., etb=...): # -> None:
        """This hook can replace sys.excepthook (for Python 2.1 or higher)."""
        ...
    


class FormattedTB(VerboseTB, ListTB):
    """Subclass ListTB but allow calling with a traceback.

    It can thus be used as a sys.excepthook for Python > 2.1.

    Also adds 'Context' and 'Verbose' modes, not available in ListTB.

    Allows a tb_offset to be specified. This is useful for situations where
    one needs to remove a number of topmost frames from the traceback (such as
    occurs with python programs that themselves execute other python code,
    like Python shells).  """
    mode: str
    def __init__(self, mode=..., color_scheme=..., call_pdb=..., ostream=..., tb_offset=..., long_header=..., include_vars=..., check_cache=..., debugger_cls=..., parent=..., config=...) -> None:
        ...
    
    def structured_traceback(self, etype, value, tb, tb_offset=..., number_of_lines_of_context=...):
        ...
    
    def stb2text(self, stb):
        """Convert a structured traceback (a list) to a string."""
        ...
    
    def set_mode(self, mode: Optional[str] = ...): # -> None:
        """Switch to the desired mode.

        If mode is not specified, cycles through the available modes."""
        ...
    
    def plain(self): # -> None:
        ...
    
    def context(self): # -> None:
        ...
    
    def verbose(self): # -> None:
        ...
    
    def minimal(self): # -> None:
        ...
    


class AutoFormattedTB(FormattedTB):
    """A traceback printer which can be called on the fly.

    It will find out about exceptions by itself.

    A brief example::

        AutoTB = AutoFormattedTB(mode = 'Verbose',color_scheme='Linux')
        try:
          ...
        except:
          AutoTB()  # or AutoTB(out=logfile) where logfile is an open file object
    """
    def __call__(self, etype=..., evalue=..., etb=..., out=..., tb_offset=...): # -> None:
        """Print out a formatted exception traceback.

        Optional arguments:
          - out: an open file-like object to direct output to.

          - tb_offset: the number of frames to skip over in the stack, on a
          per-call basis (this overrides temporarily the instance's tb_offset
          given at initialization time."""
        ...
    
    def structured_traceback(self, etype: type, evalue: Optional[BaseException], etb: Optional[TracebackType] = ..., tb_offset: Optional[int] = ..., number_of_lines_of_context: int = ...):
        ...
    


class ColorTB(FormattedTB):
    """Shorthand to initialize a FormattedTB in Linux colors mode."""
    def __init__(self, color_scheme=..., call_pdb=..., **kwargs) -> None:
        ...
    


class SyntaxTB(ListTB):
    """Extension which holds some state: the last exception value"""
    def __init__(self, color_scheme=..., parent=..., config=...) -> None:
        ...
    
    def __call__(self, etype, value, elist): # -> None:
        ...
    
    def structured_traceback(self, etype, value, elist, tb_offset=..., context=...):
        ...
    
    def clear_err_state(self): # -> None:
        """Return the current error state and clear it"""
        ...
    
    def stb2text(self, stb):
        """Convert a structured traceback (a list) to a string."""
        ...
    


def text_repr(value): # -> None:
    """Hopefully pretty robust repr equivalent."""
    ...

def eqrepr(value, repr=...):
    ...

def nullrepr(value, repr=...):
    ...

