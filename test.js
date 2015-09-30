import test from 'tape';
import { NodeGitVersioning } from './index';

test('Throw an exception when called without a tag', (t) => {
  let nodeGitVersion = new NodeGitVersioning();

  t.throws(function() {
    nodeGitVersion.version();
  });

  t.end();
});
