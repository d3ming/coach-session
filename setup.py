import sys

from setuptools import setup
from setuptools.command.test import test as TestCommand


class Tox(TestCommand):
    user_options = [('tox-args=', 'a', "Arguments to pass to tox")]

    def initialize_options(self):
        TestCommand.initialize_options(self)
        self.tox_args = None

    def finalize_options(self):
        TestCommand.finalize_options(self)
        self.test_args = []
        self.test_suite = True

    def run_tests(self):
        # import here, cause outside the eggs aren't loaded
        import tox
        import shlex

        args = self.tox_args
        if args:
            args = shlex.split(self.tox_args)
        errno = tox.cmdline(args=args)
        sys.exit(errno)


if __name__ == '__main__':
    setup(
        name='coach-session',
        version='0.1',
        description='Easily book coaching sessions!',
        url='https://github.com/d3ming/coach-session',
        packages=['server', 'server.test'],
        install_requires=[
            'virtualenv',
            'flask',
            'flask-restful',
            'requests'
        ],
        package_data={
            '': ['*.json'],
        },
        tests_require=['tox'],
        cmdclass={'test': Tox}
    )
